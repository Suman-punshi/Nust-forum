const Group = require('../models/groups');
const Post = require('../models/posts');

const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ message: 'Error fetching groups' });
  }
};

const getPostsByGroup = async (req, res) => {
  const groupName = req.params.groupName;
  try {
    const posts = await Post.find({ group: groupName });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts for group:', error);
    res.status(500).json({ message: 'Error fetching posts for group' });
  }
};

module.exports = {
  getAllGroups,
  getPostsByGroup
};
