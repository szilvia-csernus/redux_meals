import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";


const App = () => {

  const [isCartToShow, setCartToShow] = useState(false);

  const showCartHandler = props => {
    setCartToShow(true)
  }

  const hideCartHandler = props => {
    setCartToShow(false)
  }


  return (
    <CartProvider>
      {isCartToShow && <Cart onClose={hideCartHandler}/>}
      <Header onCartClick={showCartHandler}/>
      <Meals />
    </CartProvider>
  );
}

export default App;
