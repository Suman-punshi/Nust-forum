const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();


const corsOption = {
    origin : "http://localhost:3000"
}


//middleware
app.use(express.json());
app.use(cors(corsOption));

//connect database
mongoose.connect(process.env.MONGODB_URI).then(() => {
    const PORT = process.env.PORT || 8000
    app.listen(PORT, ()=> {

        console.log(`App is listenning on port ${PORT}`);

    })
}).catch(err => {
    console.log(err);
});



//route
app.get("/", (req, res) => {
    res.status(201).json({message: "Connected to Backend!"});
})





