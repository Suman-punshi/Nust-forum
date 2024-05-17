const mongoose = require('mongoose');

const communitiesSchema = new mongoose.Schema({
  community_name: {
    type: String,
    required: true,
  },
  no_of_groups: {
    type: Int32,
    required: true,
  },
  username:{
    type: String,
    required: true,
  },
  createdAt:{
    type: Date,
    required: true,
  },
  updatedAt:{
    type: Date,
    required: true,
  }
}, { collection: 'communities' });

const community = mongoose.model('communities', communitiesSchema);

module.exports = community;
