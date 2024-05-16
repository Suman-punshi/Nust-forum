// routes/cpost.js
const express = require('express');
const router = express.Router();
const create = require('../controllers/createPost');



router.post('/:userId/:group', create.addpost);



console.log("now in routes.js");
module.exports = router;