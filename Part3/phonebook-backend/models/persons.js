const mongoose = require('mongoose');
require('dotenv').config();  // Make sure the .env variables are loaded

// Get the MongoDB URI from environment variables
const url = process.env.MONGODB_URI;

// Log the MongoDB URI to ensure it's correct
console.log('MONGODB_URI:', url);

mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

// Define the schema for a person
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Transform _id to id and remove __v
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

// Export the model
module.exports = mongoose.model('Person', personSchema);
