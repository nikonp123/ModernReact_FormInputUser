const SomeInput = (props) => {
  return (
    <form>
      <div className="form-control">
        <label htmlFor="name">Введите Имя</label>
        <input type="text" id="name" />
      </div>
      <div className="form-actions">
        <button>Отправить</button>
      </div>
    </form>
  );
};

export default SomeInput;
