const http = require('http');
const WebSocketServer = require('websocket').server;

const httpServer = http.createServer((req, res) => {
  console.log(`request was made: ${req.url}`);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

const websocket = new WebSocketServer({
  httpServer: httpServer,
});
let connection;

websocket.on('request', (request) => {
  console.log(`Connection from origin: ${request.origin}`);

  connection = request.accept(null);

  connection.on('open', () => {
    console.log('Connection open');
  });

  connection.on('close', (e) => {
    console.log('Connection closed');
  });

  connection.on('message', (message) => {
    // log client message
    console.log(`Received message: ${message.utf8Data}`);

    connection.send('Hello Client');
  });

  // send random number to client every 5 seconds
  setInterval(() => {
    connection.send(`${Math.random()}`);
  }, 5000);
});

httpServer.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
