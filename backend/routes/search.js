// routes/search.js
const express = require('express');
const router = express.Router();
const Post = require('../models/posts');

router.get('/:groupName', async (req, res) => {
    try {
        const groupName = req.params.groupName;
        const posts = await Post.find({ group: groupName });
        console.log(posts);
        res.json(posts);
    } catch (error) {
        console.error('Error searching posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
