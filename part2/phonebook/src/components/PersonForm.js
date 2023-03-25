const PersonForm = ({
  name,
  number,
  formSubmit,
  nameChangeEvent,
  numberChangeEvent,
}) => (
  <form onSubmit={formSubmit}>
    <div>
      name: <input value={name} onChange={nameChangeEvent} />
    </div>
    <div>
      number: <input value={number} onChange={numberChangeEvent} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
