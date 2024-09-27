const Blog = require('../models/blog');
const User = require('../models/user');

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs', error });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optionally, you might want to delete associated blogs or handle cascading deletions here
    await Blog.deleteMany({ _id: { $in: user.blogs } });

    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error });
  }
};

// Delete a blog by ID
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete blog', error });
  }
};

// Get a specific user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('blogs');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error });
  }
};

// Get a specific blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blog', error });
  }
};

module.exports = {
  getAllBlogs,
  getAllUsers,
  deleteUser,
  deleteBlog,
  getUserById,
  getBlogById,
};
