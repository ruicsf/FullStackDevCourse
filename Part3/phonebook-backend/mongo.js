const mongoose = require('mongoose');

// Check if the user passed the password as an argument
if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
  }

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];


const url = `mongodb+srv://ruicsf:${password}@cluster0.ncoes.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(url)
    .then(() => {
        // Define the schema for a person
        const personSchema = new mongoose.Schema({
            name: String,
            number: String,
        });

        const Person = mongoose.model('Person', personSchema);

        // If both name and number are provided, add a new person
        if (name && number) {
            const person = new Person({
                name: name,
                number: number,
            });

            person.save().then(() => {
                console.log(`Added: ${name} number: ${number} to phonebook`);
                mongoose.connection.close();
            }).catch(error => {
                console.error('Error saving to database', error);
                mongoose.connection.close();
            });
        } 
        // If only the password is provided, list all contacts
        else if (process.argv.length === 3) {
            Person.find({}).then(result => {
                console.log('Phonebook:');
                result.forEach(person => {
                    console.log(`${person.name} ${person.number}`);
                });
                mongoose.connection.close();
            }).catch(error => {
                console.error('Error retrieving data from database', error);
                mongoose.connection.close();
            });
        }
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error.message);
    });