const express = require('express');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Chat App API');
});

module.exports = app;