import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const personsToShow = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const nameAlreadyExist = persons.find((person) => person.name === newName);

    if (nameAlreadyExist) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{' '}
        <input
          type='text'
          name='filter'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <h2>Add new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{' '}
          <input
            name='name'
            type='text'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          number:{' '}
          <input
            name='number'
            type='tel'
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
