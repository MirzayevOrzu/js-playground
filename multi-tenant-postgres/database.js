const knex = require('knex');

const config = {
  client: 'postgres',
  connection: {
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'tenants_app',
    password: 'postgresql_12',
  },
};

const db = kenx(config);
module.exports = { db, config };
