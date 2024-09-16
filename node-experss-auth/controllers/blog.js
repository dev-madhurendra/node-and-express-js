// controllers/blogController.js
const Blog = require('../models/blog'); 
const User = require('../models/user');

// Create a blog and associate it with the authenticated user
const createBlog = async (req, res) => {
  try {
    const { title, subtitle, imageUsed, content } = req.body;

    // Create a new blog and associate it with the logged-in user
    const blog = new Blog({
      title,
      subtitle,
      imageUsed,
      content,
      user: req.user.id,  // Associate blog with the authenticated user
    });

    const createdBlog = await blog.save();

    // Find the authenticated user and update the 'blogs' array
    await User.findByIdAndUpdate(req.user.id, { 
      $push: { blogs: createdBlog._id }  // Add the new blog's ID to the user's 'blogs' array
    });

    res.status(201).json({ message: 'Blog created successfully!', blog: createdBlog });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create blog', error });
  }
};

// Get all blogs for the logged-in user
const getAllBlogs = async (req, res) => {
  try {
    // Find all blogs associated with the logged-in user
    const blogs = await Blog.find({ user: req.user.id });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs', error });
  }
};


// Get a single blog by ID for the logged-in user
const getBlogById = async (req, res) => {
  try {
    // Find the blog by ID and ensure it belongs to the logged-in user
    const blog = await Blog.findOne({ _id: req.params.id, user: req.user.id });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found or not authorized' });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch the blog', error });
  }
};


// Update a blog by ID and verify the user owns the blog
const updateBlog = async (req, res) => {
  try {
    const { title, subtitle, imageUsed, content } = req.body;

    // Find the blog by ID
    const blog = await Blog.findById(req.params.id);

    // Verify if the blog belongs to the authenticated user
    if (blog.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to update this blog' });
    }

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Update the blog fields
    blog.title = title || blog.title;
    blog.subtitle = subtitle || blog.subtitle;
    blog.imageUsed = imageUsed || blog.imageUsed;
    blog.content = content || blog.content;

    const updatedBlog = await blog.save();

    res.status(200).json({ message: 'Blog updated successfully!', blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update blog', error });
  }
};

// Delete a blog by ID and verify the user owns the blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    // Verify if the blog belongs to the authenticated user
    if (blog.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to delete this blog' });
    }

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Delete the blog
    await blog.deleteOne();

    res.status(200).json({ message: 'Blog deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete blog', error });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
