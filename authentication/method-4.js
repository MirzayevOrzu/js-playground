// Authentication with password (hash and salt in a single column)

const express = require('express');
const { Client } = require('pg');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');

const app = express();
const client = new Client('postgres://orzu:orzu_uses_sql@localhost:5432/orzu');

app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  // check if user exist in our table
  const result = await client.query(
    'SELECT * FROM "auth_method4" WHERE username = $1',
    [username]
  );
  if (result.rowCount) {
    return res.send('User with given username already exist');
  }
  // generate salt and hash password. salt is included in the hash
  const hashedPassword = await bcrypt.hash(password, 10);
  await client.query(
    'INSERT INTO "auth_method4" (username, password) VALUES ($1, $2)',
    [username, hashedPassword]
  );
  res.end('Registered');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await client.query(
    'SELECT * FROM "auth_method4" WHERE username = $1',
    [username]
  );
  if (!result.rowCount) {
    return res.status(401).send('Invalid credentials');
  }
  const match = await bcrypt.compare(password, result.rows[0].password);
  if (!match) {
    return res.status(401).send('Invalid credentials');
  }
  res.send('Authenticated');
});

(async () => {
  try {
    await client.connect();
    console.log('DB connection is open');

    await client.query(`
    CREATE TABLE IF NOT EXISTS "auth_method4" (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        username VARCHAR(10) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL
    )`);

    app.listen(8080, () => console.log('Server is up on 8080'));
  } catch (err) {
    console.log(err);
  }
})();
