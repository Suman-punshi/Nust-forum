const express = require('express');
const router = express.Router();
const comment = require("../models/comments");

// delete comment
router.delete("/:id", async(req, res)=>{
    try{
        const id = req.params.id;
        const deleteComment = await comment.findByIdAndDelete(id);
        console.log(deleteComment);
        res.status(201).json(deleteComment);
    }
    catch (error){
        res.status(422).json(error);
    }
});

console.log("now in routes.js");
module.exports = router;