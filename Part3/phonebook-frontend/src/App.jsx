import React, { useEffect, useState } from 'react';
import PersonList from './components/PersonList';
import AddName from './components/AddName';
import FilterInput from './components/FilterInput';
import PersonService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [message, setNewMessage] = useState(null);
  const [messageType, setMessageType] = useState('success');

  useEffect(() => {
    PersonService.getAll()
      .then(response => {
        console.log("Check if it's an array: ", response);
        setPersons(response);
      });
  }, []);

  const showNotification = (msg, type = 'success', timeout = 3000) => {
    setNewMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setNewMessage(null);
    }, timeout);
  };

  // Add Person
  const addName = async (event) => {
    event.preventDefault();

     // Ensure persons is an array
    if (!Array.isArray(persons)) {
       console.error("Persons is not an array");
      return;
    }
    const existingPerson = persons.find(person => person.name === newName);
    const isExistingNumber = persons.some(person => person.number === newNumber);

    if (existingPerson && isExistingNumber) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    };

    if (existingPerson && !isExistingNumber) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        try {
          const updatedPerson = await PersonService.replace(existingPerson.id, nameObject);
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson));
          setNewName('');
          setNewNumber('');
          showNotification(`Updated ${existingPerson.name}`);
        } catch (error) {
          showNotification(`Information of ${newName} has already been removed from the server`, 'error', 5000);
        }
      }
    } else {
      // Add new person
      try {
        const addedPerson = await PersonService.create(nameObject);
        setPersons(persons.concat(addedPerson));
        setNewName('');
        setNewNumber('');
        showNotification(`Added ${nameObject.name}`);
      } catch (error) {
        showNotification(`Error adding person: ${error.response?.data?.error || error.message}`, 'error', 5000);
      }
    }
  };

  // Handle input changes
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setNewName(value);
    } else if (name === 'number') {
      setNewNumber(value);
    } else if (name === 'newSearch') {
      setNewSearch(value);
    }
  };

  // Delete Person
  const handleDelete = async (id) => {
    const selectedPerson = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${selectedPerson.name}?`)) {
      try {
        await PersonService.deleteItem(id);
        setPersons(persons.filter(person => person.id !== id));
        showNotification(`Deleted ${selectedPerson.name}`);
      } catch (error) {
        showNotification(`Information of ${selectedPerson.name} has already been removed from server`, 'error', 5000);
      }
    }
  };

  return (
    <div>
      <Notification message={message} type={messageType} />
      <h2>Phonebook</h2>
      <FilterInput handleOnChange={handleOnChange} />
      <h3>Add New</h3>
      <AddName handleOnChange={handleOnChange} addName={addName} newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <PersonList persons={persons} newSearch={newSearch} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
