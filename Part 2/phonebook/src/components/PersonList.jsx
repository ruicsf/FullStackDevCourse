import React from 'react'

const PersonList = ({persons, newSearch}) =>  {
  
  const filteredPerson = newSearch
    ? persons.filter(person =>  person.name.toLowerCase().includes(newSearch.toLowerCase()))
      : persons

    return (
      <div>
        {filteredPerson.map(person => 
          <p>{person.name}: {person.number}</p>
          )} 
      </div>
    )

}

export default PersonList;
