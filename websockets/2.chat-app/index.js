import { server as WebSocketServer } from 'websocket';
import http from 'http';
import express from 'express';
import * as path from 'path';

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

const server = http.createServer(app);

server.listen(3001, () => {
  console.log('Server is listening on port 3001');
});

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

const clients = [];

wsServer.on('request', (request) => {
  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log(
      new Date() + ' Connection from origin ' + request.origin + ' rejected.'
    );
    return;
  }

  const connection = request.accept('echo-protocol', request.origin);
  console.log(new Date() + ' Connection accepted.');

  const newClient = {
    id: clients.length + 1,
    c: connection,
  };

  clients.forEach((client) => {
    client.c.sendUTF(
      JSON.stringify({
        event: 'join_user',
        data: {
          id: newClient.id,
        },
      })
    );
  });

  clients.push(newClient);

  connection.sendUTF(
    JSON.stringify({
      event: 'accept',
      data: {
        id: newClient.id,
      },
    })
  );

  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      const data = JSON.parse(message.utf8Data);

      switch (data.event) {
        case 'salam': {
          connection.sendUTF(
            JSON.stringify({
              event: 'salam',
              data: 'Assalamu alaykum',
            })
          );
          break;
        }
        case 'one-to-one': {
          const client = clients.find((one) => one.id === data.data.id);
          client.c.sendUTF(
            JSON.stringify({
              event: 'one-to-one',
              data: {
                id: newClient.id,
                message: data.data.message,
              },
            })
          );
        }
        default: {
          connection.sendUTF(
            JSON.stringify({
              event: 'not-found',
              data: null,
            })
          );
        }
      }
    }
  });

  connection.on('close', () => {
    console.log(
      new Date() + ' Peer ' + connection.remoteAddress + ' disconnected.'
    );
  });
});
