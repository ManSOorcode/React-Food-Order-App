import { useState, useContext } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import CartContext from "./store/cart-context";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const context = useContext(CartContext);

  const showCartHandler = () => {
    setCartIsShown(true);
    console.log("lol,", cartIsShown);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
    context.removeItem(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} onValue={cartIsShown} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
