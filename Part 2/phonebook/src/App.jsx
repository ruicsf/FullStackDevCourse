import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import PersonList from './components/PersonList';
import AddName from './components/AddName'; 
import FilterInput from './components/FilterInput';
import PersonService from './services/persons'

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

  const isDuplicate = () => {    
    return persons.some(person => 
      person.name === newName && person.number === newNumber);
  };

  const isDuplicateName = () => {
    if (persons.find(person => person.name === newNumber)) {
      window.confirm(`${newName} is already added to the phonebook
        , replace the old number with a new one?`)
    }
  }

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

    if (existingPerson && !isExistingNumber) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
        {
       PersonService
        .replace(existingPerson.id, nameObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : response));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          Alert('Error updating person', error)
        })
        }
      
    } else {
      PersonService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          Alert.error('Error adding person', error);
        })
    }

   
  }

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

  const handleDelete = (id) => {
    const selectedPerson = persons.find( person => person.id === id)
    if (confirm(`Delete ${selectedPerson.name}`)){
      PersonService
      .deleteItem(id)
      .then( () => {
        setPersons(persons.filter(( persons => persons.id !== id)))
      })
    }
   
  }

  return (
    <div>
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
