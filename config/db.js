require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  
});
process.on('SIGINT', async () => {
  console.log('Received SIGINT (Ctrl+C). Closing pool...');
  await pool.end();
  console.log('Pool has been closed.');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM. Closing pool...');
  await pool.end();
  console.log('Pool has been closed.');
  process.exit(0);
});

module.exports = pool;