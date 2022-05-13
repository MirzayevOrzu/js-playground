const pg = require('pg');

const client = new pg.Client({
  user: 'orzu',
  password: 'orzu_uses_sql',
  database: 'orzu',
});

client
  .connect()
  .then(() => console.log('Connection is open'))
  .then(() => client.query('SELECT * FROM car ORDER BY id DESC LIMIT 10'))
  .then((result) => console.table(result.rows))
  .then(() =>
    client.query('INSERT INTO car (make, model, price) VALUES ($1, $2, $3)', [
      'Tesla',
      'S',
      100109.0,
    ])
  )
  .then(() => client.query('SELECT * FROM car ORDER BY id DESC LIMIT 10'))
  .then((result) => console.table(result.rows))
  .catch((err) => console.log(err))
  .finally(() => client.end());
