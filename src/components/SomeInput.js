import { useState, useRef } from 'react';

const SomeInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  // const [isEnteredNameValid, setIsEnteredNameValid] = useState(true);
  const [wasInputNameTouched, setWasInputNameTouched] = useState(false);
  const isEnteredNameValid = enteredName.trim() !== '';
  const isInputNameInvalid = !isEnteredNameValid && wasInputNameTouched;

  const [enteredEmail, setEnteredEmail] = useState('');
  const [wasInputEmailTouched, setWasInputEmailTouched] = useState(false);
  const isEnteredEmailValid = enteredEmail.includes('@');
  const isInputEmailInvalid = !isEnteredEmailValid && wasInputEmailTouched;

  let isFormValid = false;
  if (isEnteredNameValid && isEnteredEmailValid) {
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

  const nameEmailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const inputEmailLostFocusHandler = (e) => {
    setWasInputEmailTouched(true);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setWasInputNameTouched(true);
    setWasInputEmailTouched(true);

    if (!isEnteredNameValid || !isEnteredEmailValid) {
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

    console.log(enteredEmail);
    setEnteredEmail('');
    setWasInputEmailTouched(false);

    console.log(nameLastInputRef.current.value);
    nameLastInputRef.current.value = ''; //not best practice
  };

  const nameInputClasses = isInputNameInvalid
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = isInputEmailInvalid
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
      <div className={emailInputClasses}>
        <label htmlFor="eMail">Введите e-mail</label>
        <input
          type="email"
          id="eMail"
          onChange={nameEmailChangeHandler}
          onBlur={inputEmailLostFocusHandler}
          value={enteredEmail}
        />
        {isInputEmailInvalid && (
          <p className="error-text">Enter valid e-mail</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Отправить</button>
      </div>
    </form>
  );
};

export default SomeInput;
