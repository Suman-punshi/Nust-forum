const express = require('express');
const router = express.Router();
const groupsController = require('../controllers/groupsController');

router.get('/', groupsController.getAllGroups);
router.get('/:groupName', groupsController.getPostsByGroup);

module.exports = router;

