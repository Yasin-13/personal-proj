const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    name: String,
    userId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    email: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
