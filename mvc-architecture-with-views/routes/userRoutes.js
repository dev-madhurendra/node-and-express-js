// routes/userRoutes.js
const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUserForm,
  createUser,
  updateUserForm,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// Get all users
router.get('/users', getAllUsers);

// Create a new user form
router.get('/users/new', createUserForm);

// Get a single user by ID
router.get('/users/:id', getUserById);

// Update a user form
router.get('/users/:id/edit', updateUserForm);

// Create a new user
router.post('/users', createUser);

// Update a user
router.patch('/users/:id', updateUser);

// Delete a user
router.delete('/users/:id', deleteUser);

module.exports = router;
