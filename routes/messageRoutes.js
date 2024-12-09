const express = require('express');
const { postMessage,getAllMessages } = require('../controllers/messagesController.js');
const router = express.Router();

router.post('/messages', async (req, res) => {
        try {
          const messages = await postMessage();
          res.json(messages);
        } catch (err) {
          res.status(500).json({ error: 'Failed to fetch messages' });
        }
     });

router.post('/messages', async (req, res) => {
        try {
          const result = await getAllMessages();
          res.json(result);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to retrieve messages' });
        }
      });
  module.exports = router;