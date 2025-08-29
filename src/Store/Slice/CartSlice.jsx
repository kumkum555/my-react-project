import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const coupons = {
  NEWUSER10: 10,   
  SAVE20: 20,      
  FESTIVE30: 30,  
  WELCOME5: 5,     
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: 0,
    totalItems: 0,
    discount: 0,       
    appliedCoupon: "", 
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exists = state.cartItems.find((i) => i.id === item.id);

      if (!exists) {
        state.cartItems.push({ ...item, quantity: 1 });
        state.total += item.price;
        state.totalItems += 1;
        toast.success("Item added to cart!");
      } else {
        exists.quantity += 1;
        state.total += item.price;
        state.totalItems += 1;
        toast.info("Item quantity increased!");
      }
    },

    removeFromCart: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) {
        state.total -= item.price * item.quantity;
        state.totalItems -= item.quantity;
        state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
        toast.error("Item removed from cart!");
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
      state.totalItems = 0;
      state.discount = 0;
      state.appliedCoupon = "";
      toast.warn("Cart cleared!");
    },

    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.total += item.price;
        state.totalItems += 1;
        toast.info("Item quantity increased!");
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.total -= item.price;
        state.totalItems -= 1;
        toast.info("Item quantity decreased!");
      }
    },

    
    applyCoupon: (state, action) => {
      const code = action.payload.trim().toUpperCase(); 
      if (coupons[code]) {
        state.appliedCoupon = code;
        state.discount = (state.total * coupons[code]) / 100;
        toast.success(`${code} applied! ${coupons[code]}% discount`);
      } else {
        state.appliedCoupon = "";
        state.discount = 0;
        toast.error("Invalid coupon code!");
      }
    },

    removeCoupon: (state) => {
      state.appliedCoupon = "";
      state.discount = 0;
      toast.info("Coupon removed!");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
