const Statistics = ({ good, neutral, bad }) => {
  const hasFeedback = good || neutral || bad;
  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positive = (good / all) * 100 || 0;

  return (
    <article>
      <h2>statistics</h2>
      {hasFeedback ? (
        <>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {all}</p>
          <p>average {average}</p>
          <p>positive {positive} %</p>
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </article>
  );
};

export default Statistics;
