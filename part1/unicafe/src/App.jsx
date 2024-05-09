import { useState } from 'react';

import Button from './components/Button';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positive = (good / all) * 100 || 0;

  return (
    <section>
      <article>
        <h2>give feedback</h2>
        <Button
          onClick={() => setGood((prevGood) => prevGood + 1)}
          text='good'
        />
        <Button
          onClick={() => setNeutral((prevNeutral) => prevNeutral + 1)}
          text='neutral'
        />
        <Button
          onClick={() => setBad((prevBad) => prevBad + 1)}
          text='bad'
        />
      </article>

      <article>
        <h2>statistics</h2>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {average}</p>
        <p>positive {positive} %</p>
      </article>
    </section>
  );
};

export default App;
