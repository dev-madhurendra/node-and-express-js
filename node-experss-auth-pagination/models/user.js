const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// Blog schema (for reference)
const Blog = require('./blog'); 
const logger = require('../config/logger');

// User schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String, // URL to the user's avatar
  },
  shortbio: {
    type: String, // A short biography about the user
  },
  role: {
    type: String,
    required: true,
    default: "NORMAL"
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Blog, 
  }]
}, { timestamps: true }); 

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  if (!this.password) {
    return next(new Error('Password is required for hashing'));
  }

  try {

    const salt = await bcrypt.genSalt(10);
    // Hash the password
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {

    console.error("Error hashing the password", {
      message: error.message,
      stack: error.stack,
    });

    next(error);
  }
});


// Method to match the hashed password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// User model
const User = mongoose.model('User', userSchema);

module.exports = User;
