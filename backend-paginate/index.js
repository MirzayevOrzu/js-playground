import express from 'express';
import pg from 'pg';
import generateFullUrl from './utils/gen-full-url.js';
import { paginator } from './paginator.js';

const { Client } = pg;
const app = express();
const client = new Client('postgres://orzu:orzu_uses_sql@localhost:5432/orzu');

app.use(generateFullUrl);

app.get('/cars', async (req, res) => {
  const per_page = parseInt(req.query.per_page) || 10;
  const pl = parseInt(req.query.pl) || 5;
  const total = +(await client.query('SELECT COUNT(*) FROM car')).rows[0].count;
  const current_page = parseInt(req.query.page) || 1;
  const offset = (current_page - 1) * per_page;

  const cars = await client.query('SELECT * FROM car LIMIT $1 OFFSET $2', [
    per_page,
    offset,
  ]);

  res.json({
    paginator: paginator(total, per_page, current_page, req.fullUrl, pl),
    cars: cars.rows,
  });
});

(async () => {
  await client.connect();
  console.log('Connected to database');

  app.listen(8080, () => console.log('Listening on port 8080'));
})();
