import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalPrice: 0.0,
    totalItem: 0,
    items: [], // An array to store cart items
  },
  reducers: {
    addToCart: (state, action) => {
      const { name, quantity, price, product } = action.payload;
      // Check if the product is already in the cart
      const existingItem = state.items.find((item) => item.product === product);
      state.totalPrice += price;
      state.totalItem += 1;
      if (existingItem) {
        // If the product is in the cart, update the quantity and total price
        existingItem.quantity += 1;
      } else {
        // If the product is not in the cart, add it as a new item
        state.items.push({
          product,
          name,
          quantity,
          price,
        });
      }
    },
    removeFromCart: (state, action) => {
      const { product } = action.payload;
      // Find the product in the cart
      const existingItem = state.items.find((item) => item.product === product);

      if (existingItem) {
        state.totalItem -= 1;
        state.totalPrice -= existingItem.price;
        // If the product is in the cart, update the quantity and total price
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // If the requested quantity is greater or equal, remove the item from the cart
          state.items = state.items.filter((item) => item.product !== product);
        }
      }
    },
    finishCheckOut: (state) => {
      state.totalItem = 0;
      state.totalPrice = 0;
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, finishCheckOut } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
