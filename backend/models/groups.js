const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  community_id: {
    type: Int32,
    required: true,
  },
  No_of_Members: {
    type: Int32,
    required: true,
  }
}, { collection: 'groups' });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
