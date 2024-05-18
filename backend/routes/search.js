// routes/search.js
/*const express = require('express');
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

module.exports = router;*/
// routes/search.js
// routes/search.js
const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const User = require('../models/usermodel');

router.get('/group/:groupName', async (req, res) => {
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

// Utility function to escape regex special characters
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

router.get('/:searchTerm', async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm;
        const safeSearchTerm = escapeRegex(searchTerm); // Escape special regex characters
        const regex = new RegExp(safeSearchTerm, 'i'); // 'i' makes it case-insensitive

        // Search for posts and users
        const postsPromise = Post.aggregate([
            { $match: { group: { $regex: regex } } },
            { $group: { _id: "$group", count: { $sum: 1 } } },
            { $project: { _id: 0, label: "$_id", count: 1, type: { $literal: "group" } } },
            { $limit: 5 }
        ]);
        const usersPromise = User.find({
            $or: [
                { username: { $regex: regex } },
                { email: { $regex: regex } }
            ]
        }).limit(5).select('username -_id');

        // Wait for both promises to resolve
        const [posts, users] = await Promise.all([postsPromise, usersPromise]);

        // Format user results to match the expected structure
        const formattedUsers = users.map(user => ({ label: 'u/' + user.username, type: 'user', count: 1 }));

        // Combine results and check if empty
        const combinedResults = [...posts, ...formattedUsers];
        if (combinedResults.length === 0) {
            return res.status(404).json({ message: 'No match found' });
        }

        // Send combined results
        res.json(combinedResults);
    } catch (error) {
        console.error('Error in combined search:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
