import React from 'react';

const AddName = ({ handleOnChange, addName, newName, newNumber }) => {
  return (
    <form onSubmit={addName}>
      <div>
        Name: <input name="name" value={newName} onChange={handleOnChange} />
      </div>
      <div>
        Number: <input name="number" value={newNumber} onChange={handleOnChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default AddName;
