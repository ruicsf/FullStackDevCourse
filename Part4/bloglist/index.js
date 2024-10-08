const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');  
require('dotenv').config();  // Load environment variables

const Blog = require('./models/blog');  // Import the Blog model

// Use the MongoDB URI from the environment
const mongoUrl = process.env.MONGODB_URI || 'mongodb+srv://ruicsf:rkamfWork22%21@cluster0.ncoes.mongodb.net/bloglist?retryWrites=true&w=majority';

// Connect to MongoDB
console.log('Connecting to MongoDB:', mongoUrl);
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));  // Request logging

// Routes to get and add blogs
app.get('/api/blogs', (request, response, next) => {
  Blog.find({})
    .then(blogs => response.json(blogs))
    .catch(error => next(error));  // Error handling
});

app.post('/api/blogs', (request, response, next) => {
  const blog = new Blog(request.body);
  blog.save()
    .then(savedBlog => response.status(201).json(savedBlog))
    .catch(error => next(error));  // Error handling
});

// Error handling middleware
app.use((request, response) => {
  response.status(404).json({ error: 'Unknown endpoint' });
});

app.use((error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted ID' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
});

// Start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
