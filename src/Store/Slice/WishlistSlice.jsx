import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid'

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        userid: 1,
        wishlistItems: []
    },
    reducers: {

        addItemToWishlist: (state, action) => {

            const { type, payload } = action

            const newItem = {
                id: uuid(),
                productID: payload.id,
                title: payload.title,
                thumbnail: payload.thumbnail

            }

            state.wishlistItems = [...state.wishlistItems, newItem]

            console.log("addItemToWishlist action has been executed...")
        },

        removeItemFromWishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter(
                (item) => item.id !== action.payload
            );

            console.log("removeItemFromWishlist action has been executed...");
        }

    }
})



export const { addItemToWishlist, removeItemFromWishlist } = wishlistSlice.actions;


export default wishlistSlice.reducer
