const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  
  text: {
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
  },
  votes:{
    type: Int32,
    required: true,
  },
  group_name:{
    type: String,
    required: true,
  },
  post_title:{
    type: String,
    required: true,
  },
  post_text:{
    type: String,
    required: true,
  },
  tag:{
    type: String,
    required: true,
  },
  num_comments:{
    type: Int32,
    required: true,
  },
  attachment:{
    type: String,
    required: true,
  },
  createdAt:{
    type: TimeStamp,
    required: true,
  },
  updatedAt:{
    type: TimeStamp,
    required: true,
  }
}, { collection: 'posts' });

const post = mongoose.model('posts', postSchema);

module.exports = post;
