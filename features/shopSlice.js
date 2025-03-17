import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cart: [],
};

export const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        addCart: (state, { payload }) => {
            const isCartExist = state.cart.some(item => item.id === payload.product.id);
            if (!isCartExist) {
                state.cart.push({
                    ...payload.product,
                    qty: payload?.qty ? payload.qty : 1,
                });
                toast.success("Item added to cart.");
            } else {
                toast.error("This item is already in the cart.");
            }
            localStorage.setItem("local-cart", JSON.stringify(state.cart));
        },

        deleteCart: (state, { payload }) => {
            state.cart = state.cart.filter(item => item.id !== payload);
            localStorage.setItem("local-cart", JSON.stringify(state.cart));
            toast.error("Item removed from cart.");
        },

        addQty: (state, { payload }) => {
            state.cart = state.cart.map(item =>
                item.id === payload.id ? { ...item, qty: payload.qty } : item
            );
            localStorage.setItem("local-cart", JSON.stringify(state.cart));
        },

        reloadCart: (state) => {
            const cart = JSON.parse(localStorage.getItem("local-cart"));
            if (cart) {
                state.cart = cart;
            }
        },

        setCart: (state, action) => {
            state.cart = action.payload;
            localStorage.setItem("local-cart", JSON.stringify(state.cart));
        },

        clearCart: (state) => {
            state.cart = [];
            localStorage.removeItem("local-cart");
            // toast.success("Cart has been cleared.");
        },

        loadCheckoutData: (state) => {
            const data = JSON.parse(localStorage.getItem("checkout-data"));
            if (data) {
                state.checkoutData = data;
            }
        }
    }
});

export const {
    addCart,
    deleteCart,
    addQty,
    reloadCart,
    setCart,
    setCheckoutData,
    updateSelectedOption,
    updateZipcode,
    clearCart,
    loadCheckoutData
} = shopSlice.actions;

export default shopSlice.reducer;
