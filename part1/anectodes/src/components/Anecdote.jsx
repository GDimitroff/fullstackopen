const Anecdote = ({ title, anecdote, votes }) => (
  <article>
    <h2>{title}</h2>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </article>
);

export default Anecdote;
