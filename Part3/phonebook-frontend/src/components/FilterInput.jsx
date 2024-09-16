import React from 'react'

const FilterInput = ({handleOnChange}) => {


  return (
    <div>
    filter shown with <input name="newSearch" onChange={handleOnChange} />
  </div>
  )
}

export default FilterInput;