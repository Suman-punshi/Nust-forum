const Project = require('../models/Users');
const mongoose = require('mongoose');
const Comment = require('../models/comments');


const getPostById = async (req, res) => {
    console.log("now in controller");
    const { postId } = req.params;
    try {
        console.log("now in try");
        const project = await Project.findById(postId);
        const comments = await Comment.find({ p_id: postId}); // Fetch comments related to the post
        console.log("project:", project);
        console.log("comments:", comments);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ project, comments });
    } catch (error) {
        console.log("now in catch");
        console.error('Error fetching project by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getPostById
};
