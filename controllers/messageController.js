const { Message, User } = require('../models'); // Adjust for your ORM setup

// Get all messages (for admin or testing)
async function getAllMessages(req, res) {
  try {
    const messages = await Message.findAll({
      include: [{ model: User, as: 'sender' }, { model: User, as: 'receiver' }],
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
}

// Get messages by user ID
async function getMessagesByUser(req, res) {
  const { userId } = req.params;

  try {
    const messages = await Message.findAll({
      where: { receiverId: userId },
      include: [{ model: User, as: 'sender' }],
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
}

// Send a new message
async function sendMessage(req, res) {
  const { receiverId, content } = req.body;
  const senderId = req.user.id; // Retrieved from the JWT token

  if (!receiverId || !content) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newMessage = await Message.create({
      senderId,
      receiverId,
      content,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
}

module.exports = { getAllMessages, getMessagesByUser, sendMessage };