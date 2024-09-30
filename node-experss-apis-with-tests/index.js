const express = require('express');
const blogRoutes = require('./routes/blog');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Blog routes
app.use('/api/v1', blogRoutes);
// User routes
app.use('/api/v1', userRoutes);
// Admin routes
app.use('/api/v1/admin', adminRoutes)


app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT} !`);
});

module.exports = {
  app
}
