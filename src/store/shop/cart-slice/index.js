import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  cartItems: [],
  isLoading: false,
}

export const addToCart = createAsyncThunk("cart/addToCart", async ({ userId, productId, quantity, size }) => {
  console.log("Adding to cart with data:", { userId, productId, quantity, size })
  const response = await axios.post("http://localhost:5000/api/shop/cart/add", {
    userId,
    productId,
    quantity,
    size,
  })

  
  return response.data
})

export const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async (userId) => {
  
  const response = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`)

  
  return response.data
})

export const deleteCartItem = createAsyncThunk("cart/deleteCartItem", async ({ userId, productId, size }) => {
  console.log("Deleting cart item:", { userId, productId, size })
  
  // Fix the URL format to match what the backend expects
  // The backend route should be: /cart/:userId/:productId/:size
  const url = `http://localhost:5000/api/shop/cart/${userId}/${productId}/${size}`
  
  console.log("Delete URL:", url)
  const response = await axios.delete(url)
  console.log("Delete cart item response:", response.data)
  return response.data
})

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity, size }) => {
    
    const response = await axios.put("http://localhost:5000/api/shop/cart/update-cart", {
      userId,
      productId,
      quantity,
      size,
    })

    
    return response.data
  },
)

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartItems = action.payload.data
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false
        state.cartItems = []
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartItems = action.payload.data
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false
       
        state.cartItems = []
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartItems = action.payload.data
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false
        
        state.cartItems = []
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartItems = action.payload.data
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false
        
        state.cartItems = []
      })
  },
})

export default shoppingCartSlice.reducer

