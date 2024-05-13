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
// mongoose.connect(process.env.MONGODB_URI).then(() => {
//     const PORT = process.env.PORT || 8000
//     app.listen(PORT, ()=> {

//         console.log(`App is listenning on port ${PORT}`);

//     })
// }).catch(err => {
//     console.log(err);
// });


// connect to your MongoDB database through your URI. 
// The connect() function takes a uri and callback function as arguments.
mongodb.MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
    // connect to your specific collection (a.k.a database) that you specified at the end of your URI (/database)
    const collection = db.collection("post");
  
    // Responds to GET requests with the route parameter being the username.
    // Returns with the JSON data about the user (if there is a user with that username)
    // Example request: https://mynodeserver.com/myusername
    app.get("/", (req, res) => {
      // search the database (collection) for all users with the `user` field being the `user` route paramter
      collection.find({}).toArray((err, docs) => {
        if (err) {
          // if an error happens
          res.send("Error in GET req.");
        } else {
          // if all works
          res.send(docs); // send back all users found with the matching username
        }
      });
    });
  
    // Responds to POST requests with the route parameter being the username.
    // Creates a new user in the collection with the `user` parameter and the JSON sent with the req in the `body` property
    // Example request: https://mynodeserver.com/myNEWusername
    app.post("/:user", (req, res) => {
      // inserts a new document in the database (collection)
      collection.insertOne(
        { ...req.body, user: req.params.user }, // this is one object to insert. `requst.params` gets the url req parameters
        (err, r) => {
          if (err) {
            res.send("Error in POST req.");
          } else {
            res.send("Information inserted");
          }
        }
      );
    });
  
    // this doesn't create a new user but rather updates an existing one by the user name
    // a request looks like this: `https://nodeserver.com/username23` plus the associated JSON data sent in
    // the `body` property of the PUT request
    app.put("/", (req, res) => {
      collection.find({ user: req.params.user }).toArray((err, docs) => {
        if (err) {
          // if and error occurs in finding a user to update
          res.send("Error in PUT req.");
        } else {
          collection.updateOne(
            { user: req.params.user }, // if the username is the same, update the user
            { $set: { ...req.body, user: req.params.user } }, // update user data
            (err, r) => {
              if (err) {
                // if error occurs in actually updating the data in the database
                console.log("Error in updating database information");
              } else {
                // everything works! (hopefully)
                res.send("Updated successfully");
              }
            }
          );
        }
      });
  
      // if someone goes to base route, send back they are home.
      app.get("/", (req, res) => {
        res.send("You are home 🏚.");
      });
    });
  
    // listen for requests
    var listener = app.listen(port, () => {
      console.log("Your app is listening on port " + listener.address().port);
    });
  });













//route
app.get("/", (req, res) => {
    res.status(201).json({message: "Connected to Backend!"});
})



