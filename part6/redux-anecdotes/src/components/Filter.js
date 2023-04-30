import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();

  const changeFilter = (evt) => {
    dispatch(filterAction(evt.target.value));
  };

  const filterAction = (val) => ({ type: "filter/setFilter", payload: val });

  return (
    <>
      <p>
        filter <input onChange={changeFilter} />
      </p>
    </>
  );
};

export default Filter;
