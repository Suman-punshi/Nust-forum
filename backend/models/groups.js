const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  community_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  No_of_members: {
    type: Number,
    required: true,
  },
  createdAt:{
    type: Date,
    required: true
  },
  updatedAt:{
    type: Date,
    required: true,
  }
}, { collection: 'groups' });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
