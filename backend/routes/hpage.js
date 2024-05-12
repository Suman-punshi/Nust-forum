// routes/projects.js
const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');




router.get('/:userId', projectsController.getProjects);
router.get('/group/:group', projectsController.getGroupProjects); // New route to get posts by group ID


console.log("now in routes.js");
module.exports = router;