// inventorySlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInventory } from "../services/apiService";

export const getInventory = createAsyncThunk("inventory/getInventory", fetchInventory);

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    products: [],
    totalProducts: 0,
    totalStoreValue: 0,
    outOfStock: 0,
    categories: 0,
  },
  reducers: {
    deleteProduct(state, action) {
      state.products = state.products.filter((product) => product.id !== action.payload);
      updateWidgets(state);
    },
    editProduct(state, action) {
      const { id, updatedProduct } = action.payload;
      state.products = state.products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      );
      updateWidgets(state);
    },
    disableProduct(state, action) {
      state.products = state.products.map((product) =>
        product.id === action.payload ? { ...product, disabled: true } : product
      );
      updateWidgets(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInventory.fulfilled, (state, action) => {
      state.products = action.payload;
      updateWidgets(state);
    });
  },
});

// Function to update widgets like total products, store value, out of stock, etc.
function updateWidgets(state) {
  // Update the total number of products
  state.totalProducts = state.products.length;

  // Update the total store value by calculating the sum of price * quantity
  console.log(state.products)
  state.totalStoreValue = state.products.reduce((acc, product) => {
    const value = parseInt(product.value.replace('$', '').trim()) || 0; // Remove the dollar sign and parse as integer
    return acc + value; // Add the parsed value
  }, 0);

  // Calculate the out of stock count (when quantity is 0)
  state.outOfStock = state.products.filter((product) => product.quantity === 0 || product.quantity === "0").length;

  // Update the number of categories
  state.categories = new Set(state.products.map((product) => product.category)).size;
}

export const { deleteProduct, editProduct, disableProduct } = inventorySlice.actions;
export default inventorySlice.reducer;
