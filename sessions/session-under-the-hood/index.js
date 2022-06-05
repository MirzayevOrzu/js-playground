import http from 'node:http';
import path from 'node:path';
import url from 'node:url';
import fs from 'node:fs';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const users = [];
let sessions = []

const server = http.createServer((req, res) => {

  bodyParser(req, res, (req, res) => {

    cookieParser(req, res, (req, res) => {

      if (req.method === 'GET' && req.url === '/register') {
        // REGISTER PAGE
        
        res.setHeader('Content-Type', 'text/html');
        fs.readFile(path.join(__dirname, 'register.html'), 'utf8', (err, data) => {
          res.end(data);
        });
      
      } else if (req.method === 'GET' && req.url === '/login') {
        // LOGIN PAGE
        
        res.setHeader('Content-Type', 'text/html');
        fs.readFile(path.join(__dirname, 'login.html'), 'utf8', (err, data) => {
          res.end(data);
        });
        
      } else if (req.method === 'POST' && req.url === '/register') {
        // REGISTER ROUTE
        
        const { username, email, password } = req.body;
          
        const userId = Date.now();
        users.push({ id: userId, username, email, password });
        const session = { id: `s${Date.now()}id`, userId };
        sessions.push(session);
          
        const expirationTime = new Date(Date.now() + 2 * 60 * 1000).toUTCString(); // 2 min
        
        res.writeHead(302, {
          'Set-Cookie': [`session_id=${JSON.stringify(session)};expires=${expirationTime}`],
          'Location': '/protected'
        }).end();
        
      } else if (req.method === 'POST' && req.url === '/login') {
        // LOGIN ROUTE

        const { email, password } = req.body;
        const user = users.find((user) => user.email === email);

        if(!user) {
          return res.writeHead(302, {
            'Location': '/login'
          }).end();
        }

        sessions = sessions.filter(session => session.userId !== user.id);
        const session = { id: `s${Date.now()}id`, userId: user.id };
        sessions.push(session);

        const expirationTime = new Date(Date.now() + 2 * 60 * 1000).toUTCString(); // 2 min

        res.writeHead(302, {
          'Set-Cookie': [`session_id=${JSON.stringify(session)};expires=${expirationTime}`],
          'Location': '/protected'
        }).end();

      } else if (req.method === 'GET' && req.url === '/protected') {
        // PROTECTED ROUTE

        // auhentication middleware
        authMiddleware(req, res, (req, res) => {
          const { username } = req.user;

          res.setHeader('Content-Type', 'text/html')
          res.end(`
          <h1>Protected Route | Here is "${username}", your personal data</h1>
          <a href="/logout">Logout</a>
          `);
        });

      } else if (req.method === 'GET' && req.url === '/logout') {
        // LOGOUT ROUTE

        const expirationTime = new Date(Date.now() - 10**5).toUTCString(); // past time

        res.writeHead(302, {
          'Set-Cookie': [`session_id=expired;expires=${expirationTime}`],
          'Location': '/login'
        }).end();
      }
    });
  });
});

server.listen(8000, () => {
  console.log('Server is listening on port 8000');
});










function bodyParser(req, res, next) {

  if (req.method !== 'GET') {

    if (!req.hasOwnProperty('body')) {
      req.body = {};
    }

    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      for (const propTwin of data.split('&')) {
        const [propNameEncoded, propValEncoded] = propTwin.split('=');
        req.body[decodeURIComponent(propNameEncoded)] =
          decodeURIComponent(propValEncoded);
      }

      next(req, res);
    });
  } else {
    next(req, res);
  }
}


function cookieParser(req, res, next) {
  
  req.cookies = {};
  
  if(req.headers.hasOwnProperty('cookie')) { 
    const cookieKeyVals = req.headers.cookie.split('; ');
    for (let cookieKeyVal of cookieKeyVals) {
      const [key, value] = cookieKeyVal.split('=');
      req.cookies[key] = value;
    }
  }

  next(req, res);
}

function authMiddleware(req, res, next) {

  if (req.cookies.session_id) {
    const { id, userId } = JSON.parse(req.cookies.session_id);

    const session = sessions.find((session) => session.id === id);

    if(session) {
      req.user = users.find((user) => user.id === userId);
    }

    next(req, res);
  } else {
    res.writeHead(302, {
      'Location': '/login'
    }).end()
  }
}
