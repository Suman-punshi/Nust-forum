// routes/cpost.js
const express = require('express');
const router = express.Router();
const ccom = require('../controllers/create_comment');



router.post('/:userId/:postId', ccom.addComment);



console.log("now in routes.js");
module.exports = router;