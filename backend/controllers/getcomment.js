const Project = require('../models/comments');

const getcommentById = async (req, res) => {
    console.log("now in controller commment");
    const { postId } = req.params;
    try {
      const project = await Project.findById(postId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      console.error('Error fetching project by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = {
    getcommentById 
  };