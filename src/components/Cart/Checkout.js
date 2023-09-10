import React, { useState, useContext } from "react";
import classes from "./Checkout.module.css";

import useInputs from "../../hooks/use-input";

const Checkout = (props) => {
  const [formSumbit, setformSumbit] = useState(false);
  const {
    value: enterName,
    isValid: enterNameCheck,
    inputIsInValid: nameInputIsInValid,
    inputChangehandler: inputNamehandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameHandler,
    // guardFunction: guardNameFunction,
  } = useInputs((value) => value.trim() !== "");

  const {
    value: enterStreet,
    isValid: enterStreetCheck,
    inputIsInValid: streetInputIsInValid,
    inputChangehandler: inputStreethandler,
    inputBlurHandler: streetInputBlurHandler,
    reset: resetStreetHandler,
  } = useInputs((value) => value.trim() !== "");

  const {
    value: enterPostCode,
    isValid: enterPostCodeCheck,
    inputIsInValid: postCodeInputIsInValid,
    inputChangehandler: inputPostCodehandler,
    inputBlurHandler: postCodeInputBlurHandler,
    reset: resetPostCodeHandler,
  } = useInputs((value) => value.trim().length > 5);

  const {
    value: enterCity,
    isValid: enterCityCheck,
    inputIsInValid: cityInputIsInValid,
    inputChangehandler: inputCityhandler,
    inputBlurHandler: cityInputBlurHandler,
    reset: resetCityHandler,
  } = useInputs((value) => value.trim() !== "");

  let formIsValid = false;

  if (
    enterNameCheck &&
    enterStreetCheck &&
    enterPostCodeCheck &&
    enterCityCheck
  ) {
    formIsValid = true;
  }

  const inValidNameClasses = nameInputIsInValid
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  const inValidStreetClasses = streetInputIsInValid
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  const inValidPostCodeClasses = postCodeInputIsInValid
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const inValidCityClasses = cityInputIsInValid
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  const submitDisableClasses = !formIsValid ? classes.noSubmit : classes.submit;

  const formSumbitHandler = (e) => {
    e.preventDefault();
    console.log("hello");

    setformSumbit(true);

    nameInputBlurHandler();
    streetInputBlurHandler();
    postCodeInputBlurHandler();
    cityInputBlurHandler();

    const userInfo = {
      fullName: enterName,
      fullAddres: enterStreet,
      postCode: enterPostCode,
      city: enterCity,
    };

    async function sendingData() {
      const response = await fetch(
        // "https://food-order-app-1cb35-default-rtdb.firebaseio.com/userData.json",
        "https://new-food-order-59cf8-default-rtdb.firebaseio.com/userData.json",
        {
          method: "POST",
          body: JSON.stringify(userInfo),

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
    }
    sendingData();

    resetNameHandler();
    resetStreetHandler();
    resetPostCodeHandler();
    resetCityHandler();

    props.orderSubmiteState(true);
  };

  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={formSumbitHandler}>
        <div className={inValidNameClasses}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            value={enterName}
            onChange={inputNamehandler}
            onBlur={nameInputBlurHandler}
          />
        </div>
        {nameInputIsInValid && (
          <p className={classes.error}>Name Input must not be Empty </p>
        )}

        <div className={inValidStreetClasses}>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            value={enterStreet}
            onChange={inputStreethandler}
            onBlur={streetInputBlurHandler}
          />
        </div>
        {streetInputIsInValid && (
          <p className={classes.error}>street Input must not be Empty</p>
        )}

        <div className={inValidPostCodeClasses}>
          <label htmlFor="postal">Postal Code</label>
          <input
            type="text"
            id="postal"
            value={enterPostCode}
            onChange={inputPostCodehandler}
            onBlur={postCodeInputBlurHandler}
          />
        </div>
        {postCodeInputIsInValid && (
          <p className={classes.error}>postal is less than 5</p>
        )}

        <div className={inValidCityClasses}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={enterCity}
            onChange={inputCityhandler}
            onBlur={cityInputBlurHandler}
          />
        </div>
        {cityInputIsInValid && (
          <p className={classes.error}>city Input must not be Empty</p>
        )}

        <div className={classes.actions}>
          <button className={classes.back} onClick={props.onReturn}>
            Back
          </button>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button className={submitDisableClasses} disabled={!formIsValid}>
            Confirm
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Checkout;
