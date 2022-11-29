import { useState, useRef, useEffect } from 'react';

const SomeInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  // const [isEnteredNameValid, setIsEnteredNameValid] = useState(true);
  const [wasInputNameTouched, setWasInputNameTouched] = useState(false);
  const isEnteredNameValid = enteredName.trim() !== '';
  const isInputNameInvalid = !isEnteredNameValid && wasInputNameTouched;

  let isFormValid = false;
  if (isEnteredNameValid) {
    isFormValid = true;
  }

  // //not good practice uses useEffect, better - use variable aka isInputNameInvalid
  // const [isFormValid, setIsFormValid] = useState(false);
  // useEffect(() => {
  //   if (isEnteredNameValid) {
  //     setIsFormValid(true);
  //   } else {
  //     setIsFormValid(false);
  //   }
  // }, [isEnteredNameValid]);

  const nameLastInputRef = useRef();

  const nameInputChangeHandler = (e) => {
    // const currentValue = e.target.value;
    setEnteredName(e.target.value);
    // if (currentValue.trim() !== '') {
    //   setIsEnteredNameValid(true);
    // }
  };

  const inputNameLostFocusHandler = (e) => {
    setWasInputNameTouched(true);
    // if (e.target.value.trim() === '') {
    //   setIsEnteredNameValid(false);
    //   //сделаем это при каждом нажатии клавиши
    //   // } else {
    //   //   setIsEnteredNameValid(true);
    // }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setWasInputNameTouched(true);

    if (!isEnteredNameValid) {
      return;
    }
    // if (enteredName.trim() === '') {
    //   setIsEnteredNameValid(false);
    //   return;
    // }
    // setIsEnteredNameValid(true);
    console.log(enteredName);
    setEnteredName('');
    setWasInputNameTouched(false);

    console.log(nameLastInputRef.current.value);
    nameLastInputRef.current.value = ''; //not best practice
  };

  const nameInputClasses = isInputNameInvalid
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Введите Имя (валидация после отправки)</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={inputNameLostFocusHandler}
          value={enteredName}
        />
        {isInputNameInvalid && <p className="error-text">Enter valid name</p>}
      </div>
      <div className="form-control">
        <label htmlFor="lastName">Введите фамилию (useRef)</label>
        <input type="text" id="lastName" ref={nameLastInputRef} />
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Отправить</button>
      </div>
    </form>
  );
};

export default SomeInput;
