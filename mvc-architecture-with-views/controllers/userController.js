// controllers/userController.js
const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render('users/index', { users });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.render('users/show', { user });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

exports.createUserForm = (req, res) => {
  res.render('users/form', { user: null });
};

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, jobTitle } = req.body;

  try {
    const newUser = new User({ firstName, lastName, email, jobTitle });
    await newUser.save();
    res.redirect('/users');
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err.message });
  }
};

exports.updateUserForm = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.render('users/form', { user });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.redirect('/users');
  } catch (err) {
    res.status(400).json({ message: 'Error updating user', error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};
