// routes/projects.js
const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');
const postcont = require('../controllers/postbyid');
const comcont = require('../controllers/getcomment');



router.get('/', projectsController.getProjects);
router.get('/post/:postId', postcont.getPostById);
// router.get('/post/:postId', comcont.getcommentById);



console.log("now in routes.js");
module.exports = router;



