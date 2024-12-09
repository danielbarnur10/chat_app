const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Register a new user
router.post('/register', authController.register);

// Log in a user
router.post('/login', authController.login);

module.exports = router;