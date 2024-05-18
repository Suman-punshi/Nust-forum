const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const userRouter = require('./routes/users');
const projectsRouter=require('./routes/project');
const hp=require('./routes/hpage');
const group_r=require('./routes/group_route');
const create_r=require('./routes/cPost');
const tag_r=require('./routes/tag_route');
const comment_r=require('./routes/c_comment');
const searchRouter = require('./routes/search'); // Import the route for handling post search
const com = require('./routes/group_r_c');
const jg = require('./routes/joinGroup');
const path = require('path'); // Import the path module
const postsRouter = require('./routes/posts');


const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://hira:hira@nust-forum.r2zvg63.mongodb.net/database?retryWrites=true&w=majority&appName=NUST-forum', {});

app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

// Check if MongoDB is connected
const db = mongoose.connection;
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
db.once('open', () => {
    console.log('Connected to MongoDB database:', db.name);
    
    // Add routes after MongoDB is connected
    app.use('/users', userRouter);
    app.use('/cards', hp);
    app.use('/post', projectsRouter);
    app.use('/group', group_r);
    app.use('/create', create_r);
    app.use('/tags', group_r);
    app.use('/tag', tag_r);
    app.use('/search', searchRouter); // Mount the route for handling post search
    app.use('/comment', comment_r);
    app.use('/communities', com);
    app.use('/join-group', jg);
    app.use('/posts', postsRouter);
    
   
    

    // Serve static files from the 'uploads' directory in the frontend folder
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    // Start the server
    app.listen(4000, () => {
        console.log('Server started on port 4000');
    });
});
