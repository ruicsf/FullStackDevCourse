import React from 'react'

const PersonList = ({ persons, newSearch, handleDelete }) => {

  // Ensure persons is an array before applying filter
  const filteredPerson = Array.isArray(persons) 
    ? newSearch
      ? persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
      : persons
    : [];

  return (
    <div>
      {filteredPerson.map(person => 
        <p key={person.id}>
          {person.name}: {person.number} 
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </p>
      )}
    </div>
  )
}

export default PersonList;
