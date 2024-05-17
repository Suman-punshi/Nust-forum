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
  createdAt: {
    type: mongoose.Schema.Types.Timestamp,
    required: false
  },
  updatedAt: {
    type: mongoose.Schema.Types.Timestamp,
    required: false
  }
}, { collection: 'users' });

const User = mongoose.model('accounts', userSchema);

module.exports = User