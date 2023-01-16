import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        items: [],
        totalQuantity: 0,
        total: 0
    }

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addItems(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity += newItem.amount;
            state.total = (+state.total + newItem.amount * newItem.price).toFixed(2);

            if (existingItem) {
                existingItem.amount += newItem.amount
            } else {
                state.items.push(newItem)
            }

        },
        removeItem(state, action) {
            const itemId = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === itemId);
            const existingItem = state.items[existingItemIndex];
            state.totalQuantity--;
            state.total = (state.total - existingItem.price).toFixed(2);

            if (existingItem.amount > 1) {
                existingItem.amount--
            } else {
                state.items.splice(existingItemIndex, 1)
            }
        },
        clearCart()  {
            return initialState
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice