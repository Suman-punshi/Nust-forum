const express = require('express');
const router = express.Router();
const cControl = require('../controllers/communityController');



router.get('/', cControl.getCommunity);
router.get('/:userId/:communityId', cControl.getCommunitygroup);


module.exports = router;