// tagController.js
const Tag = require('../models/Tag');

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllTags
};
