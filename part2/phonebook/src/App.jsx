import { useState, useEffect } from 'react';

import personsService from './services/phonebook';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const personsToShow = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.deletePerson(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nameAlreadyExist = persons.find((person) => person.name === newName);

    if (nameAlreadyExist) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    };

    personsService.create(newPerson).then((returnedPerson) => {
      setPersons([...persons, returnedPerson]);
      setNewName('');
      setNewNumber('');
    });
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
      <Persons
        persons={personsToShow}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
