import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: []
  }, 
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exists = state.cartItems.find(i => i.id === item.id);

      if (!exists) {
        state.cartItems.push({ ...item, quantity: 1 });
        toast.success("Item added to cart!");
      } else {
        exists.quantity += 1;
        toast.info("Item quantity increased!");
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
      toast.error("Item removed from cart!");
    },
    clearCart: (state) => {
      state.cartItems = [];
      toast.warn("Cart cleared!");
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        toast.info("Item quantity increased!");
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(i => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        toast.info("Item quantity decreased!");
      }
    }
  }
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
