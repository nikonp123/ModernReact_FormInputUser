import { useRef } from 'react';
import useInput from '../hooks/use-input';

const SomeInput = (props) => {
  const {
    value: enteredName,
    isEnteredlValid: isEnteredNameValid,
    hasError: hasNameInputError,
    inputChangeHandler: nameInputChangeHandler,
    inputLostFocusHandler: nameInputLostFocusHandler,
    resetValues: resetNameInputValues,
  } = useInput((val) => val.trim() !== '');

  const {
    value: enteredEmail,
    isEnteredlValid: isEnteredEmailValid,
    hasError: hasEmailInputError,
    inputChangeHandler: emailInputChangeHandler,
    inputLostFocusHandler: emailInputLostFocusHandler,
    resetValues: resetEmailInputValues,
  } = useInput((val) => val.includes('@'));

  let isFormValid = false;
  if (isEnteredNameValid && isEnteredEmailValid) {
    isFormValid = true;
  }

  const nameLastInputRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }
    // if (!isEnteredNameValid || !isEnteredEmailValid) {
    //   return;
    // }

    console.log(enteredName);
    console.log(enteredEmail);

    resetNameInputValues();
    resetEmailInputValues();

    console.log(nameLastInputRef.current.value);
    nameLastInputRef.current.value = ''; //not best practice
  };

  const nameInputClasses = hasNameInputError
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = hasEmailInputError
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
          onBlur={nameInputLostFocusHandler}
          value={enteredName}
        />
        {hasNameInputError && <p className="error-text">Enter valid name</p>}
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
          onChange={emailInputChangeHandler}
          onBlur={emailInputLostFocusHandler}
          value={enteredEmail}
        />
        {hasEmailInputError && <p className="error-text">Enter valid e-mail</p>}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Отправить</button>
      </div>
    </form>
  );
};

export default SomeInput;
