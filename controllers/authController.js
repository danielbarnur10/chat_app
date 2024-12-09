const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');
const {User} = require('../models');

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if all required fields are provided
    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Username, password, and email are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });

    if (!existingUser) {
      // Hash the password and create user in a single line
      const user = await User.create({ 
        username, 
        email, 
        passwordHash: await bcrypt.hash(password, 10)
      });

      return res.status(201).json({ message: 'User registered successfully', user });
    } else {
      return res.status(400).json({ error: 'User is already registered' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = generateToken({ id: user.id, email: user.email });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};