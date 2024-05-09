import { useState } from 'react';

import Button from './components/Button';
import Statistics from './components/Statistics';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbacks = [
    { text: 'good', setFeedback: setGood },
    { text: 'neutral', setFeedback: setNeutral },
    { text: 'bad', setFeedback: setBad }
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
            onClick={() =>
              feedback.setFeedback((prevFeedback) => prevFeedback + 1)
            }
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
