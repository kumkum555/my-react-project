import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slice/CartSlice";
import wishlistReducer from "./Slice/WishlistSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
