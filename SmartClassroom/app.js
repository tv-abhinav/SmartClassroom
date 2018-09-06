const http = require('http');

const hostname = '192.168.2.9';
const port = 3002;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
});

server.listen(port, hostname, () => {
  console.log('Server running at http://${hostname}:${port}/');
});

