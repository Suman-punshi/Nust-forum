// projectsController.js
const Project = require('../models/Users');
console.log('a');
const getProjects = async (req, res) => {
    try {
        console.log('a');
        const projects = await Project.find();
        console.log('Projects:', projects); // Log the projects to see if they are fetched correctly
        res.json(projects);
       
    } catch (err) {
        console.error(err); // Log any errors that occur
        res.status(500).json({ message: err.message });
    }
};

  
  module.exports = {
    getProjects
  };
