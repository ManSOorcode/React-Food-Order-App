import { useState } from "react";

const useInputs = (checkingValid) => {
  const [enterInput, setEnterInput] = useState("");
  const [enterInputTouch, setEnterInputTouch] = useState(false);

  const enterInputCheck = checkingValid(enterInput);
  const inputIsInValid = !enterInputCheck && enterInputTouch;

  const inputChangehandler = (e) => {
    setEnterInput(e.target.value);
  };

  const inputBlurHandler = () => {
    setEnterInputTouch(true);
  };

  const reset = () => {
    setEnterInput("");
    setEnterInputTouch(false);
  };

  return {
    value: enterInput,
    isValid: enterInputCheck,
    inputIsInValid,
    inputChangehandler,
    inputBlurHandler,
    reset,
  };
};

export default useInputs;
