// routes/posts.js

const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');


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
    const posts = await posts.find({ username: username }); // Ensure your Post schema has a 'username' field
    res.json(posts);
  } catch (error) {
    res.status(500).send({ message: "Error fetching posts by username", error: error });
  }
});

module.exports = router;
