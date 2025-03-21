const razorpay = require("../../helpers/paypal") // Still importing from paypal.js
const Order = require("../../models/Order")
const Cart = require("../../models/Cart")
const Product = require("../../models/Product")
const crypto = require("crypto")
const sendMail = require('../../mailer');


console.log("Order controller loaded") // Debug log

const createOrder = async (req, res) => {
  console.log(`[${new Date().toISOString()}] createOrder function called`) // Debug log
  console.log(`[${new Date().toISOString()}] Request body:`, JSON.stringify(req.body, null, 2)) // Log request body

  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body

    console.log(`[${new Date().toISOString()}] Extracted request data:`, { userId, totalAmount, cartId }) // Log key data
    console.log(`[${new Date().toISOString()}] Cart items count:`, cartItems?.length) // Log cart items count

    // Create a Razorpay order
    const options = {
      amount: Math.round(totalAmount * 100), // Razorpay expects amount in paise (multiply by 100)
      currency: "INR", // Using INR as requested
      receipt: `receipt_${Date.now()}`,
    }

    console.log(`[${new Date().toISOString()}] Razorpay order options:`, options) // Log options
    console.log(`[${new Date().toISOString()}] Razorpay instance available:`, !!razorpay) // Check if razorpay is available

    // Create Razorpay order using Promise to handle callback properly
    try {
      const razorpayOrder = await new Promise((resolve, reject) => {
        razorpay.orders.create(options, (error, order) => {
          if (error) {
            console.log(`[${new Date().toISOString()}] Razorpay order creation error:`, error) // Log error details
            reject(error)
          } else {
            console.log(`[${new Date().toISOString()}] Razorpay order created successfully:`, order) // Log order details
            resolve(order)
          }
        })
      })

      // Create a new order in your database
      const newlyCreatedOrder = new Order({
        userId,
        cartId,
        cartItems,
        addressInfo,
        orderStatus: "pending",
        paymentMethod: "razorpay", // Update payment method
        paymentStatus: "pending",
        totalAmount,
        orderDate: new Date(),
        orderUpdateDate: new Date(),
        razorpayOrderId: razorpayOrder.id, // Store Razorpay order ID with correct field name
      })

      console.log(`[${new Date().toISOString()}] New order object created, about to save`) // Debug log

      await newlyCreatedOrder.save()
      console.log(`[${new Date().toISOString()}] Order saved to database with ID:`, newlyCreatedOrder._id) // Log saved order ID

      // Return the Razorpay order details
      const responseData = {
        success: true,
        orderId: newlyCreatedOrder._id,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        isRazorpay: true,
      }

      console.log(`[${new Date().toISOString()}] Sending response:`, responseData) // Log response data
      return res.status(201).json(responseData)
    } catch (orderError) {
      console.log(`[${new Date().toISOString()}] Error creating Razorpay order:`, orderError) // Log error
      throw orderError
    }
  } catch (e) {
    console.log(`[${new Date().toISOString()}] Caught exception in createOrder:`, e) // Log exception details
    console.log(`[${new Date().toISOString()}] Error stack:`, e.stack) // Log stack trace
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: e.toString(), // Include error in response for debugging
    })
  }
}

const capturePayment = async (req, res) => {
  console.log(`[${new Date().toISOString()}] capturePayment function called`) // Debug log
  console.log(`[${new Date().toISOString()}] Request body:`, JSON.stringify(req.body, null, 2)) // Log request body

  try {
    // For Razorpay, we'll receive different parameters
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body

    console.log(`[${new Date().toISOString()}] Payment details:`, { razorpayOrderId, razorpayPaymentId, orderId }) // Log payment details

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !orderId) {
      console.log(`[${new Date().toISOString()}] Missing required parameters`)
      return res.status(400).json({
        success: false,
        message: "Missing required payment parameters",
        redirectUrl: "/shop/paypal-return?status=failed",
      })
    }

    // Find the order in your database
    const order = await Order.findById(orderId)
    console.log(`[${new Date().toISOString()}] Order found:`, !!order) // Log if order was found

    if (!order) {
      console.log(`[${new Date().toISOString()}] Order not found with ID:`, orderId) // Log order ID that wasn't found
      return res.status(404).json({
        success: false,
        message: "Order cannot be found",
        redirectUrl: "/shop/paypal-return?status=failed",
      })
    }

    console.log(`[${new Date().toISOString()}] Order details:`, {
      id: order._id,
      status: order.orderStatus,
      paymentStatus: order.paymentStatus,
    }) // Log order details

    // Verify the Razorpay signature
    const secretKey = "g3qWxdImEq6HEn32b9gz9CoX" // Your Razorpay secret key
    console.log(`[${new Date().toISOString()}] Using secret key for verification (first 4 chars):`, secretKey.substring(0, 4) + "...") // Log partial key

    const generatedSignature = crypto
      .createHmac("sha256", secretKey)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex")

    console.log(`[${new Date().toISOString()}] Generated signature:`, generatedSignature) // Log generated signature
    console.log(`[${new Date().toISOString()}] Received signature:`, razorpaySignature) // Log received signature
    console.log(`[${new Date().toISOString()}] Signatures match:`, generatedSignature === razorpaySignature) // Log if signatures match

    // Verify the payment is legitimate
    if (generatedSignature === razorpaySignature) {
      console.log(`[${new Date().toISOString()}] Payment verification successful`) // Debug log

      // Update order status
      order.paymentStatus = "paid"
      order.orderStatus = "confirmed"
      order.razorpayPaymentId = razorpayPaymentId // Store Razorpay payment ID
      order.orderUpdateDate = new Date() // Update the order update date

      console.log(`[${new Date().toISOString()}] Updated order status to:`, order.orderStatus) // Log updated status

      // Save the order first to ensure payment status is updated
      await order.save()
      console.log(`[${new Date().toISOString()}] Order updated successfully`) // Log success
     
     
     
      // Add this after the order.save() in the successful payment verification block
try {
  // Format the date in a readable format
  const orderDate = new Date(order.orderDate).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Calculate subtotal
  const subtotal = order.cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  
  const orderDetails = `
 <!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4a154b; color: white; padding: 15px; text-align: center; border-radius: 5px 5px 0 0; }
    .content { border: 1px solid #ddd; border-top: none; padding: 20px; border-radius: 0 0 5px 5px; }
    .order-info, .address-info, .store-info { background-color: #f9f9f9; padding: 15px; margin-bottom: 20px; border-radius: 5px; word-wrap: break-word; }
    
    /* Table Styling */
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; table-layout: fixed; }
    th, td { padding: 10px; border-bottom: 1px solid #ddd; font-size: 14px; word-wrap: break-word; text-align: center; }
    th { background-color: #f2f2f2; font-size: 14px; }
    
    /* Image Styling */
    .product-image { width: 50px; height: 75px; object-fit: cover; border-radius: 5px; }
    
    /* Total Row Styling */
    .total-row { font-weight: bold; background-color: #f2f2f2; text-align: right; }
    
    /* Signature & Notice */
    .signature-section { margin-top: 30px; border-top: 1px dashed #ccc; padding-top: 20px; }
    .digital-signature { text-align: right; margin-top: 20px; }
    .signature-name { font-weight: bold; margin-top: 5px; }
    .receipt-notice { background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-top: 20px; font-size: 12px; text-align: center; }
    
    /* Responsive Fixes */
    @media screen and (max-width: 480px) {
      .container { padding: 10px; }
      table, th, td { font-size: 12px; padding: 5px; }
      .product-image { width: 40px; height: 60px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Payment Receipt</h2>
    </div>
    <div class="content">
      <div class="order-info">
        <h3>Order Information</h3>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Order Date:</strong> ${orderDate}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod || 'Not specified'}</p>
        <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
        <p><strong>Order Status:</strong> ${order.orderStatus}</p>
      </div>
      
      <div class="store-info">
        <h3>Store Information</h3>
        <p><strong>Store Name:</strong> Nitin Readymade</p>
        <p><strong>Contact:</strong></p>
        <p>Nitin S: +91 99672 62511</p>
        <p>Mayaram S: +91 98922 91782</p>
        <p>Email: nitinreadymade@gmail.com</p>
        <p><strong>Address:</strong> Shop No. 13, Om Datta Co, Khambdev Nagar, Dharavi, Mumbai - 400017 (Opposite Hsg. Society).</p>
      </div>
      
      <div class="address-info">
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${order.addressInfo.name || 'Not provided'}</p>
        <p><strong>Address:</strong> ${order.addressInfo.address || 'Not provided'}</p>
        <p><strong>City:</strong> ${order.addressInfo.city || 'Not provided'}</p>
        <p><strong>Pincode:</strong> ${order.addressInfo.pincode || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${order.addressInfo.phone || 'Not provided'}</p>
        <p><strong>Email:</strong> ${order.addressInfo.email || 'Not provided'}</p>
      </div>
      
      <h3>Purchase Details</h3>
      <table>
        <tr>
          <th>Product</th>
          <th>Image</th>
          <th>Price</th>
          <th>Size</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
        ${order.cartItems.map(item => ` 
          <tr>
            <td>${item.title || 'Product'}</td>
            <td>
              ${item.image ? `<img src="${item.image}" class="product-image" alt="${item.title}">` : 'No image'}
            </td>
            <td>₹${item.price || '0'}</td>
            <td>${item.size || 'NA'}</td>
            <td>${item.quantity || '0'}</td>
            <td>₹${(parseFloat(item.price || 0) * (item.quantity || 0)).toFixed(2)}</td>
          </tr>
        `).join('')}
        <tr class="total-row">
          <td colspan="5"><strong>Subtotal:</strong></td>
          <td>₹${subtotal.toFixed(2)}</td>
        </tr>
        <tr class="total-row">
          <td colspan="5"><strong>Total Amount:</strong></td>
          <td>₹${order.totalAmount.toFixed(2)}</td>
        </tr>
      </table>
      
      <p>Thank you for your purchase!</p>
      
      <div class="signature-section">
        <div class="digital-signature">
          <p>Digitally signed by:</p>
          <div class="signature-name">Nitin Readymade</div>
          <p>Date: ${new Date().toLocaleDateString('en-IN')}</p>
        </div>
      </div>
      
      <div class="receipt-notice">
        <p>This is an official payment receipt that has been digitally generated and is valid without a physical signature. This document serves as proof of your purchase from Nitin Readymade.</p>
      </div>
    </div>
    <div class="footer">
      <p>This is an automated receipt. Please keep it for your records.</p>
    </div>
  </div>
</body>
</html>


  `;

  await sendMail(
    ['sahilphadke77@gmail.com', order.addressInfo.email], 
    `New Order Received - Order ID: ${order._id}`,
    orderDetails
  );
  console.log(`[${new Date().toISOString()}] Order notification email sent successfully`);
} catch (emailError) {
  // Log the error but don't fail the payment process
  console.log(`[${new Date().toISOString()}] Error sending order notification email:`, emailError);
  console.log(`[${new Date().toISOString()}] Email error details:`, emailError.message);
}



      // Update product stock based on size
console.log(`[${new Date().toISOString()}] Updating product stock for`, order.cartItems.length, "items");

try {
  for (const item of order.cartItems) {
    console.log(`[${new Date().toISOString()}] Processing item:`, item.productId, "Size:", item.size);

    const product = await Product.findById(item.productId);
    if (!product) {
      console.log(`[${new Date().toISOString()}] Product not found with ID:`, item.productId);
      continue; // Skip this item but continue processing others
    }

    // Find the size in the product's sizes array
    const sizeIndex = product.sizes.findIndex((s) => s.size === item.size);
    if (sizeIndex === -1) {
      console.log(`[${new Date().toISOString()}] Size '${item.size}' not found for Product ID:`, item.productId);
      continue;
    }

    console.log(`[${new Date().toISOString()}] Current stock for size ${item.size}:`, product.sizes[sizeIndex].stock);
    
    // Reduce stock but ensure it doesn't go negative
    product.sizes[sizeIndex].stock = Math.max(0, product.sizes[sizeIndex].stock - item.quantity);
    console.log(`[${new Date().toISOString()}] New stock level for size ${item.size}:`, product.sizes[sizeIndex].stock);

    // Recalculate total stock
    product.totalStock = product.sizes.reduce((sum, s) => sum + s.stock, 0);
    console.log(`[${new Date().toISOString()}] Updated total stock:`, product.totalStock);

    await product.save();
    console.log(`[${new Date().toISOString()}] Product stock updated successfully`);
  }
} catch (inventoryError) {
  console.log(`[${new Date().toISOString()}] Error updating inventory (non-critical):`, inventoryError);
}

      // Remove the cart
      if (order.cartId) {
        try {
          console.log(`[${new Date().toISOString()}] Removing cart with ID:`, order.cartId) // Log cart ID
          await Cart.findByIdAndDelete(order.cartId)
          console.log(`[${new Date().toISOString()}] Cart removed successfully`) // Log success
        } catch (cartError) {
          // Log but don't fail the payment process
          console.log(`[${new Date().toISOString()}] Error removing cart (non-critical):`, cartError)
        }
      }

      console.log(`[${new Date().toISOString()}] Payment successfully verified, order updated.`)

      // Return success response with redirect URL
      const successResponse = {
        success: true,
        message: "Payment successful",
        data: { orderId: order._id, status: order.orderStatus },
        redirectUrl: `/shop/payment-success?orderId=${orderId}`,
      }

      console.log(`[${new Date().toISOString()}] Sending success response:`, successResponse)
      return res.status(200).json(successResponse)
    } else {
      // Payment verification failed
      console.log(`[${new Date().toISOString()}] Payment verification failed - signatures don't match`) // Debug log

      order.paymentStatus = "failed"
      order.orderStatus = "failed"
      order.orderUpdateDate = new Date() // Update the order update date
      
      await order.save()
      console.log(`[${new Date().toISOString()}] Order marked as failed`) // Log status update

      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
        redirectUrl: "/shop/paypal-return?status=failed",
      })
    }
  } catch (e) {
    console.log(`[${new Date().toISOString()}] Caught exception in capturePayment:`, e) // Log exception details
    console.log(`[${new Date().toISOString()}] Error stack:`, e.stack) // Log stack trace
    return res.status(500).json({
      success: false,
      message: "Failed to process payment",
      error: e.toString(), // Include error in response for debugging
      redirectUrl: "/shop/paypal-return?status=error",
    })
  }
}

// These functions remain unchanged as they don't interact with the payment gateway
const getAllOrdersByUser = async (req, res) => {
  console.log(`[${new Date().toISOString()}] getAllOrdersByUser function called`) // Debug log
  console.log(`[${new Date().toISOString()}] User ID:`, req.params.userId) // Log user ID

  try {
    const { userId } = req.params

    const orders = await Order.find({ userId }).sort({ orderDate: -1 })
    console.log(`[${new Date().toISOString()}] Orders found:`, orders.length) // Log number of orders found

    if (!orders.length) {
      console.log(`[${new Date().toISOString()}] No orders found for user:`, userId) // Log user with no orders
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      })
    }

    return res.status(200).json({
      success: true,
      data: orders,
    })
  } catch (e) {
    console.log(`[${new Date().toISOString()}] Caught exception in getAllOrdersByUser:`, e) // Log exception details
    console.log(`[${new Date().toISOString()}] Error stack:`, e.stack) // Log stack trace
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: e.toString(), // Include error in response for debugging
    })
  }
}

const getOrderDetails = async (req, res) => {
  console.log(`[${new Date().toISOString()}] getOrderDetails function called`) // Debug log
  console.log(`[${new Date().toISOString()}] Order ID:`, req.params.id) // Log order ID

  try {
    const { id } = req.params

    const order = await Order.findById(id)
    console.log(`[${new Date().toISOString()}] Order found:`, !!order) // Log if order was found

    if (!order) {
      console.log(`[${new Date().toISOString()}] Order not found with ID:`, id) // Log order ID that wasn't found
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      })
    }

    return res.status(200).json({
      success: true,
      data: order,
    })
  } catch (e) {
    console.log(`[${new Date().toISOString()}] Caught exception in getOrderDetails:`, e) // Log exception details
    console.log(`[${new Date().toISOString()}] Error stack:`, e.stack) // Log stack trace
    return res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
      error: e.toString(), // Include error in response for debugging
    })
  }
}

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
}