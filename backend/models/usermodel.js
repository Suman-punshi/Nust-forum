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
  groupsjoined: {
    type: Array,
    required: false
  },
  createdAt: {
    type: Date,
    required: false
  },
  updateAt: {
    type: Date,
    required: false
  }
}, { collection: 'accounts' });

const User = mongoose.model('accounts', userSchema);

module.exports = User