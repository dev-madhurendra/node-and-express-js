const express = require('express');
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8080;

// Middleware to parse incoming JSON request bodies
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Routes
app.get('/', (req, res) => {
  res.send(`
    <a href="/api/v1/users">Get All Users</a>
  `);
});

// Get all users
app.get('/api/v1/users', (req, res) => {
  return res.json(users);
});

// Get a user by ID
app.get('/api/v1/user/:id', (req, res) => {
  const id = +req.params.id;
  const user = users.find((user) => user.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// POST route to create a new user
app.post('/api/v1/users', (req, res) => {
  const newUser = req.body;

  if (!newUser.first_name || !newUser.last_name) {
    return res.status(400).json({ message: 'Invalid user data' });
  }

  // Add new user to the array
  users.push({id: users.length + 1, ...newUser});

  res.status(201).json({id: users.length + 1, ...newUser});
});

// PATCH route to update a user by ID
app.patch('/api/v1/user/:id', (req, res) => {
  const id = +req.params.id;
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update user fields
  const { first_name, last_name, email } = req.body;
  if (first_name) user.first_name = first_name;
  if (last_name) user.last_name = last_name;
  if (email) user.email = email;

  res.json({ message: 'User updated', user });
});

// DELETE route to remove a user by ID
app.delete('/api/v1/user/:id', (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Remove user from array
  users.splice(userIndex, 1);

  res.json({ message: 'User deleted' });
});

// Start the server
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
