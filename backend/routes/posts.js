// routes/posts.js
const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');
const Post = require('../models/posts');

// Route to insert data into the MongoDB database
router.post('/posts', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to fetch data from the MongoDB database
router.get('/posts', async (req, res) => {
  try {
    const posts = await User.find();
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// New route to fetch posts by username
router.get('/user/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const posts = await Post.find({ username: username }); // Ensure your Post schema has a 'username' field
    res.json(posts);
  } catch (error) {
    res.status(500).send({ message: "Error fetching posts by username", error: error });
  }
});




// Update post by username
router.put('/:userId/:postId', async (req, res) => {
  const { userId, postId } = req.params;
  const { Title, text } = req.body;
  try {
    console.log(`Received PUT request to update post ${postId} for user ${userId}`);
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: "User not found" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      console.log('Post not found');
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.username !== user.username) {
      console.log('Unauthorized access attempt');
      return res.status(403).json({ message: "Unauthorized" });
    }
    post.Title = Title;
    post.text = text;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(`Error updating post: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});


// Delete post by username
router.delete('/:userId/:postId', async (req, res) => {
  const { userId, postId } = req.params;
  try {
    // Fetch the user to verify existence and authorization
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the post to verify existence
    const post = await Post.findById(postId);
    if (!post) {
      console.log('Post not found');
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is authorized to delete the post
    if (post.username !== user.username) {
      console.log('Unauthorized access attempt by user:', user.username);
      return res.status(403).json({ message: "Unauthorized to delete this post" });
    }

    // Attempt to delete the post
    await Post.findByIdAndDelete(postId);


    // Sending success response
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error('Error during deletion:', error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});



module.exports = router;
