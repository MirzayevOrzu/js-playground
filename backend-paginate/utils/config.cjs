const rc = require('rc');

const conf = rc('config', {
  env: 'development',
  port: 8080,
  host: 'localhost',
  db: {
    password: 'orzu_uses_sql',
  },
});

module.exports = conf;
