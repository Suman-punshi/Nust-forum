// routes/projects.js
const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/PostController');
const tagsController = require('../controllers/tagController')


router.get('/:group', projectsController.getGroupProjects);
router.get('/:userId/:group', projectsController.getGroupProjects);
router.get('/:userId/:tag_name/:group', projectsController.getTagProjects);
router.get('/', tagsController.getAllTags);
router.get('/:userId/:tag_name', projectsController.getPostsByTag);

console.log("now in routes.js");
module.exports = router;