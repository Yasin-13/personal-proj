const Razorpay = require('razorpay');

console.log("Initializing Razorpay configuration"); 


const razorpay = new Razorpay({
  key_id: "rzp_test_RU5Isgnso9RSwv", 
  key_secret: "g3qWxdImEq6HEn32b9gz9CoX", 
});

console.log("Razorpay instance created:", !!razorpay); 

module.exports = razorpay;