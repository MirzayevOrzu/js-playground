const Queue = require('bull');
const { db } = require('./database');
const { bootstrap, getTenantConnection } = require('./connection-service');

const up = async (params) => {
  const job = new Queue(
    `setting-up-database-${new Date().getTime()}`,
    
  )
}