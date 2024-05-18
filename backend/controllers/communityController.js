const Group = require('../models/groups');
const mongoose = require('mongoose');
const Comm = require('../models/communities');


const getCommunity = async (req, res) => {
    try {
        const communities = await Comm.find();
        res.json(communities);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

const getCommunitygroup = async (req, res) => {
    try {
        console.log("in community get group");
        const c_id = req.params.communityId;
        console.log(c_id);
        const groups = await Group.find({ community_id: c_id });
        console.log(groups);
        res.json(groups);
    } catch (err) {
        console.log("error");
        res.status(500).json({ message: err.message });
    }
};






module.exports = {
    getCommunity,
    getCommunitygroup
};