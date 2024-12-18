import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./InventorySlice";

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
});
