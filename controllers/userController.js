const pool = require('../config/db');

// Fetch all users
const getAllUsers = async () => {
  try {
    const res = await pool.query('SELECT * FROM users');
    return res.rows;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};
const createUser = async () => {
  try {
    const res = await pool.query('INSERT INTO  * FROM users');
    return res.rows;
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};

module.exports = { getAllUsers };