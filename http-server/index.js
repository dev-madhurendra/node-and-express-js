const http = require('http');

const myServer = http.createServer((req, res) => {
  console.log('New Request Recieved')
  console.log(req)
  res.end('Hello from server')
})

myServer.listen(8001, () => console.log(`Server started at http://localhost:8001`));
