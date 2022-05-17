import pg from 'pg';

export const client = new pg.Client({
  user: 'orzu',
  host: 'localhost',
  database: 'orzu',
  password: process.env.DB_PASSWORD,
  port: 5432,
});
