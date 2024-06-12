import React from 'react'

const PersonList = ({persons, newSearch, handleDelete}) =>  {
  
  const filteredPerson = newSearch
    ? persons.filter(person =>  person.name.toLowerCase().includes(newSearch.toLowerCase()))
      : persons

    return (
      <div>
        {filteredPerson.map(person => 
          <p key={person.id}> 
          {person.name}: {person.number} 
          <button onClick={() => handleDelete(person.id)}> Delete</button>
          </p>
          )} 
      </div>
    )

}

export default PersonList;
