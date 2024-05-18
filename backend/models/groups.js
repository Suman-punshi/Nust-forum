const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  communityId: {
    type: Number,
    required: true,
  },
  noOfMembers: {
    type: Number,
    required: true,
  }
}, { collection: 'groups' });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
