// projectsController.js
const Project = require('../models/Users');
const User = require('../models/usermodel');

console.log('a');
const getProjects = async (req, res) => {
  const userId = req.params.userId
    try {
        console.log('a');
        const user = await User.findById(userId);
        // const projects = await Project.find();
        const projects = await Project.find({ group: { $in: user.groupsjoined } });
        console.log('Projects:', projects); // Log the projects to see if they are fetched correctly
        res.json(projects);
       
    } catch (err) {
        console.error(err); // Log any errors that occur
        res.status(500).json({ message: err.message });
    }
};




const getGroupProjects = async (req, res) => {
  const group_name= req.params.group;
  try {
    const projects = await Project.find({ group: group_name });
    res.json(projects);
    console.log('aaala');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProjects,
  getGroupProjects
};

 
/*const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
const getPostsByGroup = async (req, res) => {
  const groupName = req.params.groupName;
  try {
    const posts = await Post.find({ group: groupName });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

  
  module.exports = {
    getProjects
  };*/