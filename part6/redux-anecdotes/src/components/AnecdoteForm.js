import { useDispatch } from "react-redux";
import { addNewAnecdote } from "../reducers/anecdoteReducer";
import { triggerNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const getId = () => (100000 * Math.random()).toFixed(0);

  const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0,
    };
  };

  const add = async (evt) => {
    evt.preventDefault();
    const newAnecdote = asObject(evt.target.anecdote.value);
    dispatch(addNewAnecdote(newAnecdote));
    dispatch(triggerNotification(`New anecdote ${newAnecdote.content}`, 5));
    evt.target.anecdote.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
