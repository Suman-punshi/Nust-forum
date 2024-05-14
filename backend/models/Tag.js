// tagModel.js
const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true // Ensures each tag is unique
  }
}, { collection: 'Tags' });

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
