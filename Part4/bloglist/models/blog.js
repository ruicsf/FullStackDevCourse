const mongoose = require('mongoose');

// Define the Blog schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 }, // Default value for likes
});

// Transform the output to remove `_id` and `__v`, and convert `_id` to `id`
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

console.log('Blog schema defined');

module.exports = mongoose.model('Blog', blogSchema);
