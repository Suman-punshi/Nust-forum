const express = require('express');
const router = express.Router();
const jControl = require('../controllers/join_group');



router.post('/', jControl.joinGroup);

router.get('/check-membership/:userId/:groupId', jControl.checkMembership);


module.exports = router;