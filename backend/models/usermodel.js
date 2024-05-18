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
    type: Array,
    required: false
  },
  createdAt:{
    type: Date,
    required: false,
  },
  updatedAt:{
    type: Date,
    required: false,
  }
},{timestamps:true},
    { collection: 'users' });

const User = mongoose.model('users', userSchema);

module.exports = User