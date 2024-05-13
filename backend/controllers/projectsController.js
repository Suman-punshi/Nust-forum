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
  console.log("in getttt group controller");
  try {
    console.log("in try of group controller");
    const projects = await Project.find({ group: group_name });
    res.json(projects);
    console.log("empty: ", projects);
  } catch (err) {
    console.log("error in group controller")
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


const getTagProjects = async (req, res) => {
  const group_name= req.params.group;
  const tag_name = req.params.tag_name;
  console.log(tag_name);
  console.log(group_name);
  console.log("in get group controller");
  try {
    console.log("in try of group controller");
    const projects = await Project.find({ group: group_name, tags: tag_name });
    res.json(projects);
    console.log("empty: ", projects);
  } catch (err) {
    console.log("error in group controller")
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};




  
  module.exports = {
    getProjects,
    getGroupProjects,
    getTagProjects
  };