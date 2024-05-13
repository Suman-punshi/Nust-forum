// routes/projects.js
const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');



router.get('/:userId/:group', projectsController.getGroupProjects);
router.get('/:userId/:tag_name/:group', projectsController.getTagProjects);


console.log("now in routes.js");
module.exports = router;