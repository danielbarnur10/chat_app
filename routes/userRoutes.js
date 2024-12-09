const express = require('express');
const { getAllUsers } = require('../controllers/userController.js');
const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/user', async (req, res) => {
  try {
    const user = await getAllUsers();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;