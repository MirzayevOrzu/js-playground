const pg = require('pg');

const client = new pg.Client({
  user: 'orzu',
  password: 'orzu_uses_sql',
  database: 'orzu',
});

(async () => {
  try {
    await client.connect();
    console.log('Connection is open');

    const result1 = await client.query(
      'SELECT * FROM car ORDER BY id DESC LIMIT 10'
    );
    console.table(result1.rows);

    await client.query(
      'INSERT INTO car (make, model, price) VALUES ($1, $2, $3)',
      ['Prado', 'Land Cruiser', 85515.0]
    );

    const result2 = await client.query(
      'SELECT * FROM car ORDER BY id DESC LIMIT 10'
    );
    console.table(result2.rows);
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
    console.log('Connection is closed');
  }
})();
