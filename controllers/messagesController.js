const pool = require('../config/db');

// Fetch all messages
const postMessage = async () => {
  const { sender, recipient, content } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO messages (sender, recipient, content, sent_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [sender, recipient, content]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getAllMessages = async () => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY sent_at DESC');
    return result.rows;
  } catch (err) {
    console.error(err);
    throw err;  }
};

module.exports = { getAllMessages,postMessage };
