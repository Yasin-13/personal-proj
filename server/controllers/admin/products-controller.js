const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image1,
      image2,
      image3,
      image4,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
      sizes,
      material,
      sleeveLength,
      neck,
      length,
      occasion,
      technique,
    } = req.body;

    // Validate sizes
    if (!Array.isArray(sizes) || sizes.some(size => !size.size || !size.stock)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sizes format. Each size must include 'size' and 'stock'.",
      });
    }

    const newlyCreatedProduct = new Product({
      image1,
      image2,
      image3,
      image4,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
      sizes,
      material,
      sleeveLength,
      neck,
      length,
      occasion,
      technique,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image1,
      image2,
      image3,
      image4,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
      sizes,
      material,
      sleeveLength,
      neck,
      length,
      occasion,
      technique,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    findProduct.image1 = image1 || findProduct.image1;
    findProduct.image2 = image2 || findProduct.image2;
    findProduct.image3 = image3 || findProduct.image3;
    findProduct.image4 = image4 || findProduct.image4;
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice = salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    // Validate and update sizes
    if (sizes && Array.isArray(sizes)) {
      if (sizes.some(size => !size.size || !size.stock)) {
        return res.status(400).json({
          success: false,
          message: "Invalid sizes format. Each size must include 'size' and 'stock'.",
        });
      }
      findProduct.sizes = sizes;
    }

    findProduct.material = material || findProduct.material;
    findProduct.sleeveLength = sleeveLength || findProduct.sleeveLength;
    findProduct.neck = neck || findProduct.neck;
    findProduct.length = length || findProduct.length;
    findProduct.occasion = occasion || findProduct.occasion;
    findProduct.technique = technique || findProduct.technique;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};