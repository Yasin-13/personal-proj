const razorpay = require("../../helpers/paypal") // Still importing from paypal.js
const Order = require("../../models/Order")
const Cart = require("../../models/Cart")
const Product = require("../../models/Product")
const crypto = require("crypto")

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

      // Update product stock
      console.log(`[${new Date().toISOString()}] Updating product stock for`, order.cartItems.length, "items") // Log items count

      try {
        for (const item of order.cartItems) {
          console.log(`[${new Date().toISOString()}] Processing item:`, item.productId) // Log item being processed

          const product = await Product.findById(item.productId)
          if (!product) {
            console.log(`[${new Date().toISOString()}] Product not found with ID:`, item.productId) // Log product ID that wasn't found
            continue // Skip this item but continue processing others
          }

          console.log(`[${new Date().toISOString()}] Current stock:`, product.totalStock, "Quantity ordered:", item.quantity) // Log stock details
          product.totalStock = Math.max(0, product.totalStock - item.quantity)
          console.log(`[${new Date().toISOString()}] New stock level:`, product.totalStock) // Log new stock level

          await product.save()
          console.log(`[${new Date().toISOString()}] Product stock updated successfully`) // Log success
        }
      } catch (inventoryError) {
        // Log but don't fail the payment process
        console.log(`[${new Date().toISOString()}] Error updating inventory (non-critical):`, inventoryError)
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