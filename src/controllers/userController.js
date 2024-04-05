const User = require('../models/User');


// Create a new user
exports.createUser = async (req, res) => {
  try {
    // Check if the required fields are present in the request body
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.userType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the userType is one of the allowed values
    const allowedUserTypes = ['reader', 'creator', 'admin'];
    if (!allowedUserTypes.includes(req.body.userType)) {
      return res.status(400).json({ message: 'Invalid userType' });
    }

    // Create a new user instance
    const user = new User(req.body);

    // Save the user to the database
    await user.save();

    // Respond with the created user
    res.status(201).json(user);
  } catch (error) {
    // Handle database errors or other errors and respond with a 500 status code
    res.status(500).json({ message: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
