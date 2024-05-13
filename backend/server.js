const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const userRouter = require('./routes/users');
const projectsRouter=require('./routes/project');
const hp=require('./routes/hpage');
const group_r=require('./routes/group_route');
const create_r=require('./routes/cPost');
const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb+srv://sumankumarpunshi:Z3xPUTBGUkGMtkNv@cluster0.etnafwn.mongodb.net/forum-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
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
   
   
    
   
    
    app.listen(4000, () => {
        console.log('Server started on port 5000');
    });
})