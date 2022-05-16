// Authentication with password hash and salt

const express = require('express');
const { Client } = require('pg');
const crypto = require('node:crypto');

const app = express();
const client = new Client('postgres://orzu:orzu_uses_sql@localhost:5432/orzu');

app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  // check if user exist in our table
  const result = await client.query(
    'SELECT * FROM "auth_method3" WHERE username = $1',
    [username]
  );
  if (result.rowCount) {
    return res.send('User with given username already exist');
  }
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto
    .createHash('sha256')
    .update(password + salt)
    .digest('hex');
  await client.query(
    'INSERT INTO "auth_method3" (username, password, salt) VALUES ($1, $2, $3)',
    [username, hashedPassword, salt]
  );
  res.end('Registered');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await client.query(
    'SELECT * FROM "auth_method3" WHERE username = $1',
    [username]
  );
  const hashedPassword = crypto
    .createHash('sha256')
    .update(password + result.rows[0].salt)
    .digest('hex');
  if (!result.rowCount || result.rows[0].password !== hashedPassword) {
    return res.status(401).send('Invalid credentials');
  }
  res.send('Authenticated');
});

(async () => {
  try {
    await client.connect();
    console.log('DB connection is open');

    await client.query(`
    CREATE TABLE IF NOT EXISTS "auth_method3" (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        username VARCHAR(10) NOT null UNIQUE,
        password VARCHAR(100) NOT NULL,
        salt VARCHAR(100) NOT NULL
    )`);

    app.listen(8080, () => console.log('Server is up on 8080'));
  } catch (err) {
    console.log(err);
  }
})();
