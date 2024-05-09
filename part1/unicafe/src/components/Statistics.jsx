import StatisticsLine from './StatisticsLine';

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positive = (good / all) * 100 || 0;

  const stats = [
    { text: 'good', value: good },
    { text: 'neutral', value: neutral },
    { text: 'bad', value: bad },
    { text: 'all', value: all },
    { text: 'average', value: average },
    { text: 'positive', value: positive }
  ];

  return (
    <div>
      {stats.map((stat) => (
        <StatisticsLine
          key={stat.text}
          text={stat.text}
          value={stat.value}
        />
      ))}
    </div>
  );
};

export default Statistics;
