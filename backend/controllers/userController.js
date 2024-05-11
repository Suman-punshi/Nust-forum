const User = require('../models/usermodel');

exports.addUser = (req, res) => {
    console.log('Received request to add user:', req.body); // Log the received request body
    console.log(req.username);
    console.log('Received request to add user:', req.body);

    const { username, email, password } = req.body;

    const newUser = new User({ username, email, password });

    newUser.save()
        .then(() => {
            console.log('User added successfully');
            res.json('User added!');
        })
        .catch(err => {
            console.error('Error adding user:', err);
            res.status(400).json('Error: ' + err);
        });
};



exports.loginUser = (req, res) => {
  const { loginIdentifier, password } = req.body;

  console.log('Received request to login user:', req.body); // Log the received request body

  // Check if loginIdentifier is undefined or null
  if (!loginIdentifier) {
    return res.status(400).json({ message: 'Login identifier is missing' });
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

      // Check if the password is correct
      if (user.password !== password) {
        console.log('Incorrect password');
        return res.status(401).json({ message: 'Incorrect password' });
      }

      // If login successful, return user data (you can customize this)
      console.log('User logged in successfully');
      res.status(200).json({ message: 'Login successful', userdata: user });
    })
    .catch(err => {
      console.error('Error logging in user:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
};
