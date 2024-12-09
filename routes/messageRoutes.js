const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  getMessagesByUser,
  sendMessage,
  getAllMessages,
} = require('../controllers/messageController');

const router = express.Router();

// Route to get all messages (admin or testing purposes)
router.get('/all', authenticateToken, getAllMessages);

// Route to get messages by user
router.get('/:userId', authenticateToken, getMessagesByUser);

// Route to send a new message
router.post('/', authenticateToken, sendMessage);

module.exports = router;