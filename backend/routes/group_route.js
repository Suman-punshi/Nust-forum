// routes/projects.js
const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');



router.get('/:group', projectsController.getGroupProjects);



console.log("now in routes.js");
module.exports = router;