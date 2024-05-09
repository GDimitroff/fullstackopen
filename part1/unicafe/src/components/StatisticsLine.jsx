const StatisticsLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
      {text === 'positive' ? ' %' : ''}
    </p>
  );
};

export default StatisticsLine;
