import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({ course }) => {
  const { name, parts } = course;
  const sum = parts.reduce((acc, part) => acc + part.exercises, 0);

  return (
    <>
      <Header course={name} />
      <Content parts={parts} />
      <Total sum={sum} />
    </>
  );
};

export default Course;
