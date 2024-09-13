const express = require('express');

const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
  res.send("<h1>Home Page</h1>")
})

app.get('/about', (req, res) => {
  res.send("<h1>About Page</h1>")
})


app.get('/contact', (req, res) => {
  res.send("<h1>Contact Page</h1>")
})

app.listen(PORT, () => {
  console.log(`Server is listen on http://localhost:${PORT}`)
})

