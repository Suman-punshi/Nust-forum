const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    unique: false
  },
  images: {
    type: String,
    required: false,
    unique: false
  },
  num_comments: {
    type: Number,
    required: false
  },
  tags: {
    type: Array,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  group:{
    type: String,
    required: true
  },
  groupID:{
    type: Number,
    required: true
  }
}, { collection: 'post' });

const User = mongoose.model('post', postSchema);

module.exports = User;
