// tagModel.js
const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true // Ensures each tag is unique
  }
}, { collection: 'tags' });

const Tag = mongoose.model('tags', tagSchema);

module.exports = Tag;