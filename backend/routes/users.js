const router = require('express').Router();
const userController = require('../controllers/userController');

// Route to handle adding a new user
router.post('/', userController.addUser);

// Route to handle user login
router.post('/login', userController.loginUser);

module.exports = router;
