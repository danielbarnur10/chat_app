const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const express = require('express');
const cors = require("cors");

require('dotenv').config();
const app =express();
// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from React frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    credentials: true, // Allow cookies or authorization headers
  })
);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Chat App API');
});

module.exports = app;