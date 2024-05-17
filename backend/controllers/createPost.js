const posts = require('../models/posts');
const users = require('../models/usermodel');


exports.addpost = async(req, res) => {
    console.log("inside addpost");
    const userId = req.params.userId;
    const group = req.params.group;
    const c_user = await users.findById(userId);
    console.log('Received request to add user:', req.body); // Log the received request body
    console.log(c_user.username);
    console.log('Received request to add user:', req.body);

    const { Title, text, image, tags } = req.body;

    const newposts = new posts({ username: c_user.username, Title: Title, text: text, images: image, tags: tags, group: group});

    console.log(newposts);
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




