import { useState } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

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

    setPersons([
      ...persons,
      { name: newName, number: newNumber, id: persons.length + 1 }
    ]);
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        onFilterChange={(e) => setFilter(e.target.value)}
      />

      <h3>Add new</h3>
      <PersonForm
        newName={newName}
        onNewNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        onNewNumberChange={(e) => setNewNumber(e.target.value)}
        onSubmit={handleSubmit}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
