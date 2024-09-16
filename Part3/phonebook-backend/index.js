const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
require ('dotenv').config();


app.use(express.json()); // To handle JSON payloads
app.use(cors()); // To allow cross-origin requests
app.use(express.static('dist')); // To serve the frontend from the 'dist' folder

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let Person = require('./models/persons');

// API Routes
app.get('/api/persons/', (request, response, next) => {
    console.log('app.get called')
    console.log('all persons', response.body)
    Person.find({}).then(persons => {
        response.json(persons);
    })
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
      .then(person => {
        if (person) {
          response.json(person);
        } else {
          response.status(404).end();
        }
      })
      .catch(error => next(error));  // Call next with the error
  });
  


app.get('/info', (request, response) => {
    Person.countDocuments({}).then(count => {
        const currentTime = new Date();
        response.send(`
            <p>Phonebook has info for ${count} people</p>
            <p>${currentTime}</p>
        `);
    })
});

app.post('/api/persons', (request, response,next) => {
    const personRequestBody = request.body;
    console.log('PERSON REQUEST BODY:', personRequestBody)
    if (!personRequestBody.name || !personRequestBody.number) {
        return response.status(400).json({ error: 'name and number are required' });
      }

    const newPerson = new Person({
        "name": personRequestBody.name,
        "number": personRequestBody.number
    });

    newPerson.save()
        .then(savedPerson => response.json(savedPerson))
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end();
        })
        .catch(error => next(error));

});

// Catch-all route to serve index.html
app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
