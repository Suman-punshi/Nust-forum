// routes/projects.js
const express = require('express');
const router = express.Router();
const postcont = require('../controllers/postbyid');




router.get('/:userId/:postId', postcont.getPostById);
// router.get('/post/:postId', comcont.getcommentById);



console.log("now in routes.js");
module.exports = router;



