import { useState } from 'react';

import Button from './components/Button';
import Statistics from './components/Statistics';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbacks = [
    { text: 'good', setState: setGood },
    { text: 'neutral', setState: setNeutral },
    { text: 'bad', setState: setBad }
  ];

  const hasFeedbackGathered = good || neutral || bad;

  return (
    <section>
      <article>
        <h2>give feedback</h2>
        {feedbacks.map((feedback) => (
          <Button
            key={feedback.text}
            text={feedback.text}
            onClick={() => feedback.setState((prevState) => prevState + 1)}
          />
        ))}
      </article>

      <article>
        <h2>statistics</h2>
        {hasFeedbackGathered ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
          />
        ) : (
          <p>No feedback given</p>
        )}
      </article>
    </section>
  );
};

export default App;
