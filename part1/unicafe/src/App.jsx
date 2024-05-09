import { useState } from 'react';

import Button from './components/Button';
import Statistics from './components/Statistics';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

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

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </section>
  );
};

export default App;
