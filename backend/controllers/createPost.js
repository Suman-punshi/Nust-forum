const posts = require('../models/posts');
const users = require('../models/usermodel');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../uploads/'); // Specify the directory where images will be stored relative to the project directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Keep the original file name
    }
});


// Create multer instance with specified storage options
const upload = multer({ storage: storage }).single('image'); // Allow single image upload

exports.addpost = async (req, res) => {
    console.log("inside addpost");
    const userId = req.params.userId;
    const group = req.params.group;
    const c_user = await users.findById(userId);
    console.log('Received request to add user:', req.body); // Log the received request body
    console.log(c_user.username);
    console.log('Received request to add user:', req.body);

    // Check if an image file is uploaded
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            return res.status(500).json({ error: 'Image upload error' });
        } else if (err) {
            // An unknown error occurred when uploading
            return res.status(500).json({ error: 'Unknown error occurred' });
        }

        // No error occurred during upload
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        const { Title, text, tags } = req.body;
        const image = req.file.path; // Get the path to the uploaded image

        const newPost = new posts({ 
            username: c_user.username, 
            Title: Title, 
            text: text, 
            images: image, 
            tags: tags, 
            group: group 
        });

        console.log(newPost);
        newPost.save()
            .then(() => {
                console.log('Post created successfully');
                res.json('Post added!');
            })
            .catch(err => {
                console.error('Error creating post:', err);
                res.status(400).json('Error: ' + err);
            });
    });
};
