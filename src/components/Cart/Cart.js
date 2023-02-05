import { Fragment, useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const [checkoutState, setCheckOutState] = useState(false);

  const [afterOrder, setAfterOrder] = useState(!props.onValue);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  // console.log(cartCtx);

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
  };

  const returnHandler = () => {
    setCheckOutState(false);
  };

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

  // console.log(props.onValue);

  const onOrderSubmitehandler = (value) => {
    setAfterOrder(value);
  };

  // const onCancelHandler = () => {
  //   setAfterOrder(false);
  // };

  return (
    <Modal onClose={props.onClose}>
      {!checkoutState && cartItems}
      {!checkoutState && cartButton}

      {afterOrder && (
        <div className={classes.actions}>
          <p>Your Order 🍴 is placed 🚴‍♂️ </p>
          <button type="button" onClick={props.onClose}>
            Cancel
          </button>
        </div>
      )}

      {!afterOrder && (
        <Fragment>
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>

          {checkoutState && (
            <Checkout
              onCancel={props.onClose}
              onReturn={returnHandler}
              orderSubmiteState={onOrderSubmitehandler}
            />
          )}
        </Fragment>
      )}
    </Modal>
  );
};

export default Cart;
