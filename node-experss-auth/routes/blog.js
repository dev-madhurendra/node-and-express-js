// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const { protect } = require('../middlewares/auth');

// Route to create a new blog
router.post('/blogs',protect, blogController.createBlog);

// Route to get all blogs
router.get('/blogs',protect, blogController.getAllBlogs);

// Route to get a single blog by ID
router.get('/blogs/:id',protect, blogController.getBlogById);

// Route to update a blog by ID
router.put('/blogs/:id',protect, blogController.updateBlog);

// Route to delete a blog by ID
router.delete('/blogs/:id',protect, blogController.deleteBlog);

module.exports = router;
