import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: [], // ✅ cart ek array hai
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exists = state.find(i => i.id === item.id);

      if (!exists) {
        state.push({ ...item, quantity: 1 });
        toast.success("Item added to cart!");
      } else {
        toast.info("Item already in cart!");
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(i => i.id !== action.payload);
    },
    clearCart: () => {
      return [];
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
