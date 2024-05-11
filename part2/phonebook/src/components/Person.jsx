const Person = ({ person, onDelete }) => {
  return (
    <div>
      <span>
        {person.name} {person.number}
      </span>{' '}
      <button onClick={() => onDelete(person)}>delete</button>
    </div>
  );
};

export default Person;
