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
      const productIndex = state.products.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        state.products[productIndex] = { ...state.products[productIndex], ...updatedProduct };
        updateWidgets(state); 
      }
    },
    disableProduct(state, action) {
      const productId = action.payload;
      const productIndex = state.products.findIndex((product) => product.id === productId);
      if (productIndex !== -1) {
        const updatedProducts = [...state.products];
        updatedProducts[productIndex] = { ...updatedProducts[productIndex], disabled: true };
        state.products = updatedProducts; 
        updateWidgets(state); 
      }
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
  const activeProducts = state.products.filter((product) => !product.disabled);
  state.totalProducts = activeProducts.length;
  state.totalStoreValue = activeProducts.reduce((acc, product) => {
    const value = typeof product.value !== 'number' ? parseInt(product.value.replace('$', '').trim()) || 0 : product.value
    return acc + value;
  }, 0);
  state.outOfStock = activeProducts.filter(
    (product) => product.quantity === 0 || product.quantity === "0"
  ).length;
  state.categories = new Set(activeProducts.map((product) => product.category)).size;
}

export const { deleteProduct, editProduct, disableProduct } = inventorySlice.actions;
export default inventorySlice.reducer;
