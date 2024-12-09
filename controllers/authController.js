const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    const user = await User.create({ username, passwordHash: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user });
    }
    else
    res.status(200).json({ error: 'User is already registered',user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
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
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};