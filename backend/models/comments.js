const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  p_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  comment_text: {
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
  }
}, { collection: 'comments' });

const comment = mongoose.model('comments', commentSchema);

module.exports = comment;
