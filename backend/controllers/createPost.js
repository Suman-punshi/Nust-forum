const posts = require('../models/Users');
const users = require('../models/usermodel');


exports.addpost = async(req, res) => {
    const userId = req.params.userId;
    const group = req.params.group;
    const c_user = await users.findById(userId);
    console.log('Received request to add user:', req.body); // Log the received request body
    console.log(req.username);
    console.log('Received request to add user:', req.body);

    const { title, text, image, tag } = req.body;

    const newposts = new posts({ username: c_user.username, title, text, image, tag, group});

    newposts.save()
        .then(() => {
            console.log('Post created succesfully');
            res.json('User added!');
        })
        .catch(err => {
            console.error('Error creating post:', err);
            res.status(400).json('Error: ' + err);
        });
};




