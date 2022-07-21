import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}
// we put this reducer function outside the CartProvider function as it doesn't get any input from inside that
// function hence it should not be recreated whenever CartProvider runs.
const cartReducer = (previousState, action) => {
    let updatedItems = [...previousState.items];
    if (action.type === 'ADD') {
        
        const existingItemIndex = previousState.items.findIndex(item => item.id === action.item.id);
        const existingItem = previousState.items[existingItemIndex];

        if (existingItem) {
            let updatedItem = { ...existingItem, amount: existingItem.amount + action.item.amount}
            updatedItems[existingItemIndex] = updatedItem;   
        } else {
            // concat returns a new array and as such won't mutate the previous state.
            updatedItems = previousState.items.concat(action.item);
        }
        const updatedTotalAmount = previousState.totalAmount + action.item.price * action.item.amount
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'REMOVE') {
        const existingItemIndex = previousState.items.findIndex(item => item.id === action.id);
        const existingItem = previousState.items[existingItemIndex]; 
        let updatedItem = { ...existingItem};
        if (updatedItem.amount > 1) {
            updatedItem.amount--;
            updatedItems[existingItemIndex] = updatedItem; 
        } else {
            updatedItems.splice(existingItemIndex, 1)
        }
        const updatedTotalAmount = previousState.totalAmount - existingItem.price
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }

    }

    if (action.type === 'CLEAR') {
        return defaultCartState
    }

    return defaultCartState
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({ type: 'ADD', item: item })
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({ type: 'REMOVE', id: id })
    };

    const clearCartHandler = () => {
        dispatchCartAction({ type: 'CLEAR'})
    }

    const cartCtx = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    };

    return (
        <CartContext.Provider value={cartCtx}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider