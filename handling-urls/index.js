const fs = require('fs');
const http = require('http');
const url = require('url');

const PORT = 8001;
const myServer = http.createServer((req, res) => {
  if (req.url == "/favicon.ico") {
    return res.end();
  }

  // Log request details
  const log = `${new Date().toISOString()}: ${req.method} ${req.url} - New request received\n`;
  const myUrl = url.parse(req.url, true);

  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      return res.end("Internal Server Error");
    }

    // Handle routing based on request method and URL path
    switch (myUrl.pathname) {
      case '/':
        if (req.method === "GET") {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Home Page - GET request");
        } else if (req.method === "POST") {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString(); // Convert buffer to string
          });
          req.on('end', () => {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(`Home Page - POST request received with body: ${body}`);
          });
        }
        break;

      case '/about':
        if (req.method === "GET") {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("About Page - GET request");
        } else if (req.method === "POST") {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString(); // Convert buffer to string
          });
          req.on('end', () => {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(`About Page - POST request received with body: ${body}`);
          });
        }
        break;

      default:
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - Page Not Found");
        break;
    }
  });
});

myServer.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
