const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number, default: 0 },
    totalStock: { type: Number, required: true },
    averageReview: { type: Number, default: 0 },
    sizes: [
      {
        size: { type: String, required: true }, // Example: "S", "M", "L"
        stock: { type: Number, required: true }, // Stock count for each size
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
