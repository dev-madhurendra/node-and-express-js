const express = require('express');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const path = require('path'); // Add this line if you're using views
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

connectDB();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the directory where your views are located
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
