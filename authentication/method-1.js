// Authentication with plain text password

const express = require('express');
const { Client } = require('pg');

const app = express();
const client = new Client('postgres://orzu:orzu_uses_sql@localhost:5432/orzu');

app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  // check if user exist in our table
  const result = await client.query(
    'SELECT * FROM "auth_method1" WHERE username = $1',
    [username]
  );
  if (result.rowCount) {
    return res.send('User with given username already exist');
  }
  await client.query(
    'INSERT INTO "auth_method1" (username, password) VALUES ($1, $2)',
    [username, password]
  );
  res.end('Registered');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await client.query(
    'SELECT * FROM "auth_method1" WHERE username = $1',
    [username]
  );
  if (!result.rowCount || result.rows[0].password !== password) {
    return res.status(401).send('Invalid credentials');
  }
  res.send('Authenticated');
});

(async () => {
  try {
    await client.connect();
    console.log('DB connection is open');

    await client.query(`
    CREATE TABLE IF NOT EXISTS "auth_method1" (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        username VARCHAR(10) NOT NULL UNIQUE,
        password VARCHAR(15) NOT NULL
    )`);
    console.log('DB connection is open');

    app.listen(8080, () => console.log('Server is up on 8080'));
  } catch (err) {
    console.log(err);
  }
})();
