const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image1: String,
    image2: String, 
    image3: String,
    image4: String,
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number, default: 0 },
    totalStock: { type: Number, required: true }, // Auto-calculated from sizes stock
    averageReview: { type: Number, default: 0 },
    sizes: [
      {
        size: { type: String, required: true }, // Example: "S", "M", "L"
        stock: { type: Number, required: true, min: 0 }, // Stock count for each size
      },
    ],
    material: { type: String, required: true },
    sleeveLength: { type: String, required: true },
    neck: { type: String, required: true },
    length: { type: String, required: true },
    occasion: { type: String, required: true },
    technique: { type: String, required: true },
  },
  { timestamps: true }
);

// 🔹 Middleware: Automatically update totalStock before saving
ProductSchema.pre("save", function (next) {
  if (this.sizes && this.sizes.length > 0) {
    this.totalStock = this.sizes.reduce((sum, size) => sum + size.stock, 0);
  } else {
    this.totalStock = 0; // Default if no sizes are provided
  }
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
