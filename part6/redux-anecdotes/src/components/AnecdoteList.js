import { useSelector, useDispatch } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import { triggerNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) =>
    anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  );

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    dispatch(voteForAnecdote(newAnecdote));
    dispatch(triggerNotification(`You voted for "${anecdote.content}"`, 5));
  };

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
