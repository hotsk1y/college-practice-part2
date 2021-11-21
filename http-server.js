const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const users = [
  {
    "name": "Alex",
    "age": "18",
  },
  {
    "name": "Vlad",
    "age": "19",
  },
]

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.statusMessage = 'Hello'
  res.setHeader('Content-Type', 'text/json');
  res.end(
    JSON.stringify(users.length)
  );
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});