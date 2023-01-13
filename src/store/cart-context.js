import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  reAddDummyMeal: (item) => {},
  addItem: (item) => {},
  removeItem: (id) => {},

  beforeFetch: "",
  setFetchCondition: () => {},

  afterpost: "",
  setPostCondition: () => {},
});

export default CartContext;
