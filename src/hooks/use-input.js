import { useState } from 'react';

const useInput = (validateValueFunction) => {
  const initInputText = '';
  const [enteredValue, setEnteredValuel] = useState(initInputText);
  const [wasInputTouched, setWasInputlTouched] = useState(false);

  const isEnteredlValid = validateValueFunction(enteredValue);
  const isInputInvalid = !isEnteredlValid && wasInputTouched;

  const inputChangeHandler = (e) => {
    setEnteredValuel(e.target.value);
  };

  const inputLostFocusHandler = (e) => {
    setWasInputlTouched(true);
  };

  const resetValues = () => {
    setEnteredValuel(initInputText);
    setWasInputlTouched(false);
  };

  return {
    value: enteredValue,
    isEnteredlValid,
    hasError: isInputInvalid,
    inputChangeHandler,
    inputLostFocusHandler,
    resetValues,
  };
};

export default useInput;
