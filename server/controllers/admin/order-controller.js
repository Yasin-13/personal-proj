const Order = require("../../models/Order");
const sendMail = require('../../mailer');

const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Update order status
    await Order.findByIdAndUpdate(id, { orderStatus });

    // Prepare email content
    const userEmail = order.addressInfo.email; // User's email from order details
    const subject = `Order Status Update - Order ID: ${order._id}`;
    const html = `
     <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f8f8f8;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 10px;
      background: #ff6900;
      color: white;
      font-size: 22px;
      font-weight: bold;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 20px;
      font-size: 16px;
      color: #333;
    }
    .order-details {
      background: #f4f4f4;
      padding: 15px;
      margin-top: 10px;
      border-radius: 6px;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      padding: 10px;
      font-size: 14px;
      color: #777;
    }
    .contact {
      background: #ff6900;
      color: white;
      padding: 10px;
      margin-top: 20px;
      text-align: center;
      border-radius: 6px;
    }
    .button {
      display: inline-block;
      padding: 10px 15px;
      margin-top: 15px;
      background: #ff6900;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
  </style>
</head>
<body>

<div class="container">
  <div class="header">Nitin Readymade - Order Update</div>

  <div class="content">
    <h2>Dear ${order.addressInfo.name},</h2>
    <p>Your order <strong>#${order._id}</strong> has been updated.</p>
    <p><strong>New Status:</strong> ${orderStatus}</p>

    <div class="order-details">
      <h3>Order Summary</h3>
      <p><strong>Order Date:</strong> ${order.orderDate.toDateString()}</p>
      <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
      <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>

      <h4>Items Ordered:</h4>
      <ul>
        ${order.cartItems.map(item => `
          <li>
            <strong>${item.title}</strong> (Size: ${item.size}, Qty: ${item.quantity}) - ₹${item.price}
          </li>
        `).join('')}
      </ul>
    </div>

    <a href="https://nitinreadymade.com/shop/account" class="button">Track Order</a>

    <div class="contact">
      <p><strong>Need Help?</strong></p>
      <p>📞 Nitin S: +91 99672 62511 | 📞 Mayaram S: +91 98922 91782</p>
      <p>📧 Email: <a href="mailto:nitinreadymade@gmail.com" style="color: white;">nitinreadymade@gmail.com</a></p>
      <p>🏬 Address: Shop No. 13, Om Datta Co, Khambdev Nagar, Dharavi, Mumbai - 400017</p>
    </div>
  </div>

  <div class="footer">
    <p>Thank you for shopping with us!</p>
    <p><strong>Nitin Readymade</strong> - Elevate your style with our premium collection of men's kurtas.</p>
  </div>
</div>

</body>
</html>

    `;

    // Send email
    await sendMail(userEmail, subject, html);

    res.status(200).json({
      success: true,
      message: "Order status updated successfully! Email notification sent.",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};
module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};
