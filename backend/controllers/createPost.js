const posts = require('../models/posts');
const users = require('../models/usermodel');
const multer = require('multer');
const path = require('path');
const { promisify } = require('util');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../../uploads/');
        console.log('Upload path:', uploadPath); // Log upload path
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        console.log('Uploading file:', file.originalname); // Log uploaded filename
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb('Error: File upload only supports the following filetypes - ' + filetypes);
    },
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
}).single('image');

const uploadAsync = promisify(upload);

exports.addpost = async (req, res) => {
    try {
      console.log("Inside addpost");
      const userId = req.params.userId;
      const group = req.params.group;
  
      const c_user = await users.findById(userId);
      if (!c_user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      console.log(`Received request to add post by user: ${c_user.username}`);
  
      // Attempt to upload image
      await uploadAsync(req, res);

      const { Title, text, tags } = req.body;
      const newPostData = {
        username: c_user.username,
        Title,
        text,
        tags,
        group
      };

      // Add image path if image was uploaded
      if (req.file) {
        newPostData.images = `/uploads/${req.file.filename}`;
      }
  
      const newPost = new posts(newPostData);
      await newPost.save();
      console.log('Post created successfully');
      res.json('Post added!');
    } catch (err) {
      console.error('Error creating post:', err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(400).json({ error: 'File size too large. Max limit is 5MB' });
      } else {
        res.status(500).json({ error: 'An error occurred while creating the post' });
      }
    }
};
