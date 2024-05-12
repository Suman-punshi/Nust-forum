const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  community: {
    type: String,
    required: true,
  },
  NumMem: {
    type: Number,
    required: true,
  }
}, { collection: 'groups' });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;