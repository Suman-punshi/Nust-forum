const router = require('express').Router();
const userController = require('../controllers/userController');
const Post = require('../models/posts');
const User = require('../models/usermodel');

// Route to handle adding a new user
router.post('/', userController.addUser);

// Route to handle user login
router.post('/login', userController.loginUser);

router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username: username });
        const posts = await Post.find({ username: username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user: user, posts: posts });
    } catch (error) {
        console.error('Error fetching user profile and posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
