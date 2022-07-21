import { createContext } from "react"

// we give an initial object so it would work with autocompletition
const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: item => {},
    removeItem: id => {},
    clearCart: () => {}
})

export default CartContext