import { useState, useRef } from 'react';

const SomeInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [isEnteredNameValid, setIsEnteredNameValid] = useState(true);

  const nameLastInputRef = useRef();

  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (enteredName.trim() === '') {
      setIsEnteredNameValid(false);
      return;
    }
    setIsEnteredNameValid(true);
    console.log(enteredName);
    console.log(nameLastInputRef.current.value);
    setEnteredName('');
    nameLastInputRef.current.value = ''; //not best practice
  };

  const nameInputClasses = isEnteredNameValid
    ? 'form-control'
    : 'form-control invalid';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Введите Имя (валидация после отправки)</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
        {!isEnteredNameValid && <p className="error-text">Enter valid name</p>}
      </div>
      <div className="form-control">
        <label htmlFor="lastName">Введите фамилию (useRef)</label>
        <input type="text" id="lastName" ref={nameLastInputRef} />
      </div>
      <div className="form-actions">
        <button>Отправить</button>
      </div>
    </form>
  );
};

export default SomeInput;
