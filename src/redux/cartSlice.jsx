import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        order: {
            books: [],
            totalAmount: 0,
        }
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItemIndex = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );

            if (existingItemIndex !== -1) {
                // Update quantity for existing item
                state.cart[existingItemIndex].quantity += action.payload.quantity;
                state.order.books[existingItemIndex].quantity += action.payload.quantity;

            } else {
                // Add new item to cart with initial quantity
                state.cart.push({ ...action.payload, quantity: action.payload.quantity });
                state.order.books.push({ title: action.payload.title, quantity: action.payload.quantity });
            }
            state.order.totalAmount += action.payload.quantity * action.payload.price;
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(x => x.id != action.payload.id);
            state.order.books = state.order.books.filter((book) => book.id !== action.payload.id);
            state.order.totalAmount -= action.payload.quantity * action.payload.price;
        },
        reset: (state, action) => {
            state.cart = [];
            state.order.books = [];
            state.order.totalAmount = 0;

        }
    }
})

export default cartSlice.reducer;

export const { addToCart, removeFromCart, reset } = cartSlice.actions;