const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AXCQhOVV2D7U-rqmgU2GueF9TtNuEOmyJnaYOh0ea50arWFEWByH8ZTUSuJ0gaPBcN0R3LP4JOtjOVuw",
  client_secret: "EM3zVhQuO8Jq9eZmq11bNBKNDQOw26_xXExMtt9fIjFURwBySPeZ760dvTB5K2lfuNd4sbQBZTiGsGot",
});

module.exports = paypal;
