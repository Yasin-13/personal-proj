const Cart = require("../../models/Cart")
const Product = require("../../models/Product")

const addToCart = async (req, res) => {
  try {
    console.log("Add to cart request body:", req.body)
    const { userId, productId, quantity, size } = req.body

    if (!userId || !productId || quantity <= 0 || !size) {
      console.log("Invalid data provided:", { userId, productId, quantity, size })
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      })
    }

    const product = await Product.findById(productId)

    if (!product) {
      console.log("Product not found:", productId)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    let cart = await Cart.findOne({ userId })

    if (!cart) {
      console.log("Creating new cart for user:", userId)
      cart = new Cart({ userId, items: [] })
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size,
    )

    if (findCurrentProductIndex === -1) {
      console.log("Adding new item to cart:", { productId, quantity, size })
      cart.items.push({ productId, quantity, size })
    } else {
      console.log("Updating existing item quantity:", cart.items[findCurrentProductIndex].quantity, "+", quantity)
      cart.items[findCurrentProductIndex].quantity += quantity
    }

    await cart.save()
    console.log("Cart saved successfully:", cart._id)
    res.status(200).json({
      success: true,
      data: cart,
    })
  } catch (error) {
    console.log("Error in addToCart:", error)
    res.status(500).json({
      success: false,
      message: "Error",
    })
  }
}

const fetchCartItems = async (req, res) => {
  try {
    
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is manadatory!",
      })
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image1 title price salePrice",
    })

    if (!cart) {
      console.log("Cart not found for user:", userId)
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      })
    }

    const validItems = cart.items.filter((productItem) => productItem.productId)
    

    if (validItems.length < cart.items.length) {
      cart.items = validItems
      await cart.save()
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image1,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
      size: item.size,
    }))

    
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    })
  } catch (error) {
    console.log("Error in fetchCartItems:", error)
    res.status(500).json({
      success: false,
      message: "Error",
    })
  }
}

const updateCartItemQty = async (req, res) => {
  try {
    
    const { userId, productId, quantity, size } = req.body

    if (!userId || !productId || quantity <= 0 || !size) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      })
    }

    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      })
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size,
    )

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present !",
      })
    }

    cart.items[findCurrentProductIndex].quantity = quantity
    await cart.save()

    await cart.populate({
      path: "items.productId",
      select: "image1 title price salePrice",
    })

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image1 : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
      size: item.size,
    }))

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    })
  } catch (error) {
    console.log("Error in updateCartItemQty:", error)
    res.status(500).json({
      success: false,
      message: "Error",
    })
  }
}

const deleteCartItem = async (req, res) => {
  try {
    console.log("Delete cart item request:", req.params)
    const { userId, productId, size } = req.params
    
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      })
    }

    // First find the cart without population
    const cart = await Cart.findOne({ userId })

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      })
    }

    // Filter items safely without assuming population
    const originalLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => !(item.productId.toString() === productId && item.size === size)
    )
    
    console.log(`Removed ${originalLength - cart.items.length} items from cart`);
    
    // Save the cart with filtered items
    await cart.save()

    // Now populate for the response
    await cart.populate({
      path: "items.productId",
      select: "image1 title price salePrice",
    })

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image1 : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
      size: item.size,
    }))

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    })
  } catch (error) {
    console.log("Error in deleteCartItem:", error)
    res.status(500).json({
      success: false,
      message: "Error",
    })
  }
}

module.exports = {
  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItems,
}

