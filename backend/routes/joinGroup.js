const express = require('express');
const router = express.Router();
const jControl = require('../controllers/join_group');



router.post('/', jControl.joinGroup);



module.exports = router;