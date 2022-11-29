import useInput from '../hooks/use-input';

const isInputEmpty = (val) => val.trim() !== '';

const SomeForm = (props) => {
  const {
    value: enteredFirstName,
    isEnteredlValid: isEnteredFirstNameValid,
    hasError: hasFirstNameInputError,
    inputChangeHandler: firstNameInputChangeHandler,
    inputLostFocusHandler: firstNameInputLostFocusHandler,
    resetValues: resetInputFirstNameValues,
  } = useInput(isInputEmpty);

  const {
    value: enteredLasttName,
    isEnteredlValid: isEnteredLastNameValid,
    hasError: hasLastNameInputError,
    inputChangeHandler: lastNameInputChangeHandler,
    inputLostFocusHandler: lastNameInputLostFocusHandler,
    resetValues: resetInputLastNameValues,
  } = useInput(isInputEmpty);

  const {
    value: enteredEmail,
    isEnteredlValid: isEnteredEmailValid,
    hasError: hasEmailInputError,
    inputChangeHandler: emailInputChangeHandler,
    inputLostFocusHandler: emailInputLostFocusHandler,
    resetValues: resetInputEmailValues,
  } = useInput((val) => val.includes('@'));

  let isFormValid = false;
  if (
    isEnteredFirstNameValid &&
    isEnteredLastNameValid &&
    isEnteredEmailValid
  ) {
    isFormValid = true;
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(enteredFirstName);
    console.log(enteredLasttName);
    console.log(enteredEmail);
    resetInputFirstNameValues();
    resetInputLastNameValues();
    resetInputEmailValues();
  };

  const classesFirstName = hasFirstNameInputError
    ? 'form-control invalid'
    : 'form-control';
  const classesLastName = hasLastNameInputError
    ? 'form-control invalid'
    : 'form-control';
  const classesEmail = hasEmailInputError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="control-group">
        <div className={classesFirstName}>
          <label htmlFor="first-name">Введите Имя</label>
          <input
            type="text"
            id="first-name"
            onChange={firstNameInputChangeHandler}
            onBlur={firstNameInputLostFocusHandler}
            value={enteredFirstName}
          />
          {hasFirstNameInputError && (
            <p className="error-text">Enter valid first name</p>
          )}
        </div>
        <div className={classesLastName}>
          <label htmlFor="last-name">Введите Фамилию</label>
          <input
            type="text"
            id="last-name"
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputLostFocusHandler}
            value={enteredLasttName}
          />
          {hasLastNameInputError && (
            <p className="error-text">Enter valid last name</p>
          )}
        </div>
      </div>
      <div className={classesEmail}>
        <label htmlFor="email">Введите E-Mail</label>
        <input
          type="text"
          id="email"
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

export default SomeForm;
