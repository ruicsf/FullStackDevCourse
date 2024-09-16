// services/persons.js
import axios from 'axios';

const baseUrl = '/api/persons';

// Get all persons
const getAll = () => {
  return axios.get(baseUrl)
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching data:", error);
      throw error;  // Optionally rethrow the error for the calling code to handle
    });
};

// Create a new person
const create = newObject => {
  return axios.post(baseUrl, newObject)
    .then(response => response.data)
    .catch(error => {
      console.error("Error creating new entry:", error);
      throw error;
    });
};

// Delete a person by ID
const deleteItem = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error("Error deleting entry:", error);
      throw error;
    });
};

// Update (replace) an existing person's details
const replace = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
    .then(response => response.data)
    .catch(error => {
      console.error("Error updating entry:", error);
      throw error;
    });
}

export default { getAll, create, deleteItem, replace };
