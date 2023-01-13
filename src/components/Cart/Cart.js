import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const [checkoutState, setCheckOutState] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  console.log(cartCtx);

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // let conditionForForm = !cartCtx.stateClone;
  // console.log(conditionForForm);

  const formCheckoutHandler = () => {
    console.log("hello");
    setCheckOutState(true);

    // conditionForForm = cartCtx.stateClone;
    // console.log(conditionForForm);
  };

  const returnHandler = () => {
    setCheckOutState(false);
  };
  // cartCtx.stateClone = false;

  const cartButton = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={formCheckoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {!checkoutState && cartItems}

      {!cartCtx.afterpost && (
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
      )}
      {/* {console.log("lol")} */}
      {checkoutState && (
        <Checkout onCancel={props.onClose} onReturn={returnHandler} />
      )}
      {!checkoutState && cartButton}
      {/* {!conditionForForm && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={formCheckoutHandler}>
              Order
            </button>
          )}
        </div> */}
      {/* )} */}
    </Modal>
  );
};

export default Cart;
