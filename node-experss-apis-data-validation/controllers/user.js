const User = require('../models/user'); 
const logger = require('../config/logger'); // For logging
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, avatar_url, shortbio, role } = req.body;

    // Check if all required fields are provided
    if (!firstname || !lastname || !username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (role === 'ADMIN') {
      const isAdminUserExists = await User.findOne({ role: 'ADMIN' });

      if (isAdminUserExists) {
        return res.status(400).json({ message: 'An admin user already exists' });
      }
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists, please login !' });
    }

    // Create a new user
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password,
      avatar_url,
      shortbio,
      role
    });

    logger.info(">> New User created !");

    // Save the user to the database
    const savedUser = await newUser.save();

    logger.info(">> Saved User ");

    // Return a success response with the user details (omit password)
    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: savedUser._id,
        firstname: savedUser.firstname,
        lastname: savedUser.lastname,
        username: savedUser.username,
        email: savedUser.email,
        avatar_url: savedUser.avatar_url,
        shortbio: savedUser.shortbio,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Function to handle user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Generate a JWT token
      const token = generateToken(user._id);

      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        avatar_url: user.avatar_url,
        shortbio: user.shortbio,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

const uploadAvatar = async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    logger.info(">> Uploading file")

    // Update user's avatar_url in the database
    const user = await User.findById(req.user.id);
    user.avatar_url = `/uploads/${req.file.filename}`; // Save the relative file path

    logger.info(">> Uploaded file")

    await user.save();

    logger.info(">> User saved")

    res.status(200).json({ message: 'Avatar uploaded successfully', avatar_url: user.avatar_url });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload avatar', error });
  }
};



module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  uploadAvatar,
};
