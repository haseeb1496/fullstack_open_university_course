const Filter = ({ searchTerm, changeEvent }) => (
  <div>
    filter shown with <input value={searchTerm} onChange={changeEvent} />
  </div>
);

export default Filter;
