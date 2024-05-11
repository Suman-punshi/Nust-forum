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
    type: array,
    required: false
  }
}, { collection: 'usertable' });

const User = mongoose.model('usertable', userSchema);

module.exports = User;