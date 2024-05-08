const Total = ({ parts }) => {
  const totalExercises = parts.reduce((acc, part) => acc + part.exercises, 0);

  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;
