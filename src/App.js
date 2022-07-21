import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";


const App = () => {
  const [isCartToShow, setCartToShow] = useState(false);

  const showCartHandler = () => {
    setCartToShow(true)
  }

  const hideCartHandler = () => {
    setCartToShow(false)
  }


  return (
    <>
      {isCartToShow && <Cart onClose={hideCartHandler}/>}
      <Header onCartClick={showCartHandler}/>
      <Meals />
    </>
  );
}

export default App;
