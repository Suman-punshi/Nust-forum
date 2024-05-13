// routes/posts.js

const express = require('express');
const router = express.Router();
const User = require('../models/post.models');

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

module.exports = router;
