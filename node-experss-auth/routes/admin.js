const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/auth');
const {
  getAllBlogs,
  getAllUsers,
  deleteUser,
  deleteBlog,
  getUserById,
  getBlogById,
} = require('../controllers/admin');

// Admin routes
router.get('/blogs', protect, admin, getAllBlogs);
router.get('/users', protect, admin, getAllUsers);
router.delete('/user/:id', protect, admin, deleteUser);
router.delete('/blog/:id', protect, admin, deleteBlog);
router.get('/user/:id', protect, admin, getUserById);
router.get('/blog/:id', protect, admin, getBlogById);

module.exports = router;
