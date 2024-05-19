const express = require('express');
const router = express.Router();
const Comment = require("../models/comments");

// Delete comment
router.delete("/deleteComment/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteComment = await Comment.findByIdAndDelete(id);
        res.status(201).json(deleteComment);
    } catch (error) {
        res.status(422).json(error);
    }
});

// Update comment
router.put("/comment/:postId/:commentId", async (req, res) => {
    try {
        const { commentId } = req.params;
        const { text } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(commentId, { text }, { new: true });
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(422).json(error);
    }
});

module.exports = router;
