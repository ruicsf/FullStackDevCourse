import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import PersonList from './components/PersonList';
import AddName from './components/AddName'; 
import FilterInput from './components/FilterInput';
import PersonService from './services/persons'
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect (() => {
    PersonService
      .getAll()
      .then(response => {
        setPersons(response)
      })    
  }, [])

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [message, setNewMessage] = useState(null);
  const [messageType, setMessageType] = useState('success')

  // Add Person
  const addName = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName);
    const isExistingNumber = persons.some(person => person.number === newNumber);

    if (existingPerson && isExistingNumber){
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const nameObject = {
        name: newName,
        number: newNumber
    }
    // same name new number
    if (existingPerson && !isExistingNumber) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
       PersonService
        .replace(existingPerson.id, nameObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : response));
          setNewName('');
          setNewNumber('');
          setNewMessage( `Added ${existingPerson.name}` )
        })
          .catch(error => {
            setMessageType('error');
            setNewMessage( `Information of ${newName} has already been removed from server`);
            setTimeout(() => {
              setNewMessage(null)
            }, 5000)
          })
        }
      // new person
    } else {
      PersonService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response));
          setNewName('');
          setNewNumber('');
          setMessageType('success')
          setNewMessage(`Added ${nameObject.name}`)
          setTimeout(() => {
            setNewMessage(null)
          }, 3000)
        })
        .catch(error => {
          alert('Error adding person', error);
        })
    }

   
  }
// Handle change
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setNewName(value);
    }
    if (name === 'number') {
      setNewNumber(value);
    }
    if (name === 'newSearch') {
      setNewSearch(value);
    }
  };
  
// Delete
  const handleDelete = (id) => {
    const selectedPerson = persons.find( person => person.id === id)
    if (confirm(`Delete ${selectedPerson.name}`)){
      PersonService
      .deleteItem(id)
      .then( () => {
        setPersons(persons.filter(( persons => persons.id !== id)))
      })
      .catch (error => {
        alert(`Information of ${selectedPerson.name} has already been removed from server`)
      })
    }
   
  }

  return (
    <div>
      <Notification message={message} type={messageType}/>
      <h2>Phonebook</h2>
      <FilterInput handleOnChange={handleOnChange}/>
      <h3>Add New</h3>
      <AddName handleOnChange={handleOnChange} addName={addName} newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <PersonList persons={persons} newSearch={newSearch} handleDelete={handleDelete} />  
    </div>
  );
};


export default App;
