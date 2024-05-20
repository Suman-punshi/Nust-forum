const User = require('../models/usermodel');

exports.joinGroup = async (req, res) => {
    const { userId, group } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the group to the groups_joined array if it's not already there
        if (!user.groups_joined.includes(group)) {
            user.groups_joined.push(group);
        }
        await user.save();
        res.status(200).json({ message: 'Group joined successfully' });
    } catch (error) {
        console.error('Error joining group:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.checkMembership = async (req, res) => {
    const { userId, groupId } = req.params;
    try {
        const user = await User.findById(userId);
        const isMember = user.groups_joined.includes(groupId);
        res.status(200).json({ isMember });
    } catch (error) {
        console.error('Failed to check group membership:', error);
        res.status(500).json({ message: "Error checking membership", error: error });
    }
};