// Authentication - encrypting everything, do not store password in database

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
    'SELECT * FROM "auth_method5" WHERE username = $1',
    [username]
  );
  if (result.rowCount) {
    return res.send('User with given username already exist');
  }
  const userDataEncypted = encryptAES(JSON.stringify({ username }), password);
  await client.query(
    'INSERT INTO "auth_method5" (username, userdata) VALUES ($1, $2)',
    [username, String(userDataEncypted)]
  );
  res.end('Registered');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await client.query(
    'SELECT * FROM "auth_method5" WHERE username = $1',
    [username]
  );
  if (!result.rowCount) {
    return res.status(401).send('Invalid credentials');
  }
  const userData = JSON.parse(decryptAES(result.rows[0].userdata, password));
  res.json(userData);
});

(async () => {
  try {
    await client.connect();
    console.log('DB connection is open');

    await client.query(`
    CREATE TABLE IF NOT EXISTS "auth_method5" (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        username VARCHAR(10) NOT NULL UNIQUE,
        userdata TEXT NOT NULL
    )`);
    console.log('DB connection is open');

    app.listen(8080, () => console.log('Server is up on 8080'));
  } catch (err) {
    console.log(err);
  }
})();

function encryptAES(plainText, key) {
  const encrypt = crypto.createCipher('aes256', key);
  let encrypted = encrypt.update(plainText, 'utf8', 'hex');
  encrypted += encrypt.final('hex');
  return encrypted;
}

function decryptAES(encryptedText, key) {
  try {
    const decrypt = crypto.createDecipher('aes256', key);
    let decrypted = decrypt.update(encryptedText, 'hex', 'utf8');
    decrypted += decrypt.final();
    return decrypted;
  } catch (ex) {
    return ex;
  }
}
