import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  reAddDummyMeal: (item) => {},
  addItem: (item) => {},
  removeItem: (id) => {},

  beforeFetch: "",
  setFetchState: () => {},

  afterpost: false,
  setFormSubmit: () => {},
});

export default CartContext;
