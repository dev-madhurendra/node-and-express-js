const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
const { BASE_API } = require('./utils/AppConstants');

dotenv.config();

// Initialize Express App
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // For parsing JSON request bodies

// User Routes
app.use(BASE_API, userRoutes);

// Error Handler 
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
