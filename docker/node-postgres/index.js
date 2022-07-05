const express = require('express');
const { Client } = require('pg');

const app = express();
app.use(express.json());
const client = new Client({
  host: 'postgres',
  port: 5432,
  user: 'postgres',
  database: 'postgres',
  password: 'postgresql_12',
});

client
  .connect()
  .then(() => {
    console.log('Database connection is open');
    client
      .query(
        `
    CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY NOT NULL,
      name VARCHAR(120) NOT NULL
    )`
      )
      .then(() => {
        console.log('Table is mapped');
      })
      .catch((err) => {
        console.log('Table creation failed');
      });
  })
  .catch((err) => {
    console.log(err);
    console.log('Database error occured');
  });

app.get('/', (req, res) => {
  res.json({
    status: 'OK',
  });
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  client
    .query('INSERT INTO users (name) VALUES ($1)', [name])
    .then(() => {
      res.json({
        status: 'CREATED',
      });
    })
    .catch((err) => {
      res.json({
        status: 'FAILED',
        error: err,
      });
    });
});

app.get('/users', (req, res) => {
  client
    .query('SELECT * FROM users')
    .then((result) => {
      res.json({
        status: 'OK',
        data: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 'FAILED',
        error: err,
      });
    });
});

app.listen(3000, () => {
  console.log('Up and running on port 3000');
});
