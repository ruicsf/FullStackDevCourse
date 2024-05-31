import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import PersonList from './components/PersonList';
import AddName from './components/AddName'; 
import FilterInput from './components/FilterInput';

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect (() => {
    console.log('effect')

    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fullfiled')
      setPersons(response.data) 
    })
  }, [])
  console.log ('render', persons.length, 'persons')


  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  // ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const nameInputRef = useRef(null);

  const isDuplicate = () => {    
    return persons.some(person => 
      person.name === newName && person.number === newNumber);
  };

  const addName = (event) => {
    event.preventDefault();

    if (isDuplicate()) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }; 
      setPersons(persons.concat(nameObject));
    }
    setNewName(''); 
    setNewNumber(''); 
    nameInputRef.current.focus();  
  };

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

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput handleOnChange={handleOnChange}/>
      <h3>Add New</h3>
      <AddName handleOnChange={handleOnChange} addName={addName} newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <PersonList persons={persons} newSearch={newSearch} />  
    </div>
  );
};

export default App;
