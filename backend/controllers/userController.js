const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const saltRounds = 10; // Number of salt rounds for hashing the password

exports.addUser = (req, res) => {
  console.log('Received request to add user:', req.body);

  const { username, email, password } = req.body;

  // Check for empty fields
  if (!username || !email || !password) {
      return res.status(400).json('Please fill in all fields');
  }

  // Validate email
  if (!validator.isEmail(email)) {
      return res.status(400).json('Invalid email address');
  }

  // Validate password length (minimum 8 characters)
  if (password.length < 8) {
      return res.status(400).json('Password must be at least 8 characters long');
  }

  // Check if the user already exists
  User.findOne({ $or: [{ username }, { email }] })
      .then(existingUser => {
          if (existingUser) {
              return res.status(409).json('User already exists with the same username or email');
          }

          // If user does not exist, hash the password and create a new user
          bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
              if (err) {
                  console.error('Error hashing password:', err);
                  return res.status(500).json('Error hashing password');
              }

              // Create a new user with the hashed password
              const newUser = new User({
                  username,
                  email,
                  password: hashedPassword // Store the hashed password, not the plain one
              });

              // Save the new user to the database
              newUser.save()
                  .then(() => {
                      console.log('User added successfully');
                      res.json('User added!');
                  })
                  .catch(err => {
                      console.error('Error adding user:', err);
                      res.status(400).json('Error: ' + err);
                  });
          });
      })
      .catch(err => {
          console.error('Error checking user existence:', err);
          res.status(500).json('Internal server error');
      });
};

exports.loginUser = (req, res) => {
  const { loginIdentifier, password } = req.body;


  console.log('Received request to login user:', req.body); // Log the received request body

  // Check if loginIdentifier or password is undefined or null
  if (!loginIdentifier || !password) {
      return res.status(400).json({ message: 'Login identifier and password are required' });
  }

  // Find the user based on the provided loginIdentifier (either username or email)
  User.findOne({
      $or: [
          { username: loginIdentifier },
          { email: loginIdentifier }
      ]
  })
  .then(user => {
      if (!user) {
          console.log('User not found');
          return res.status(404).json({ message: 'User not found' });
      }

      // Use bcrypt to compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
              console.error('Error comparing passwords:', err);
              return res.status(500).json({ message: 'Internal server error' });
          }
          if (!isMatch) {
              console.log('Incorrect password');
              return res.status(401).json({ message: 'Incorrect password' });
          }

          // If login successful, return user data (you can customize this)
          console.log('User logged in successfully');
          console.log(user._id);
          res.status(200).json({ message: 'Login successful', userdata: {
              id: user._id,
              username: user.username,
              email: user.email,
              password: user.password
          }});
      });
  })
  .catch(err => {
      console.error('Error logging in user:', err);
      res.status(500).json({ message: 'Internal server error' });
  });
};