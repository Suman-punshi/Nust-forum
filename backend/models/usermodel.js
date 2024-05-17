const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  groups_joined: {
    type: Int32,
    required: false
  },
  createdAt:{
    type: TimeStamp,
    required: true,
  },
  updatedAt:{
    type: TimeStamp,
    required: true,
  }
}, { collection: 'users' });

const User = mongoose.model('users', userSchema);

module.exports = User