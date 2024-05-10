const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const projectsRouter = require('./routes/project');


const app = express();

// Enable CORS
app.use(cors());

mongoose.connect('mongodb+srv://sumankumarpunshi:Z3xPUTBGUkGMtkNv@cluster0.etnafwn.mongodb.net/forum-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Check if MongoDB is connected
const db = mongoose.connection;
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
db.once('open', () => {
    console.log('Connected to MongoDB database:', db.name);


    // Add routes after MongoDB is connected
    app.use('/', projectsRouter);
    app.use('/post/:postId', projectsRouter);
    console.log("test test");

    app.listen(5000, () => {
        console.log('Server started on port 5000');
    });
});


