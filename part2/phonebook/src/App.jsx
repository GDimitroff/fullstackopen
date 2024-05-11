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

  const createPerson = () => {
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

  const updatePerson = (person) => {
    const confirmationMessage = `${person.name} is already added to phonebook, replace the old number with a new one?`;

    if (window.confirm(confirmationMessage)) {
      const changedPerson = { ...person, number: newNumber };

      personsService.update(person.id, changedPerson).then((returnedPerson) => {
        setPersons(
          persons.map((p) => {
            return p.id !== person.id ? p : returnedPerson;
          })
        );
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const person = persons.find((person) => person.name === newName);
    person ? updatePerson(person) : createPerson();
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
