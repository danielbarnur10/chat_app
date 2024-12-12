const http = require('http');
const { Server } = require('socket.io');
const app = require('./app'); 
const { Message } = require('./models'); // Adjust path as needed
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with specific client origin for production
  },
});
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('sendMessage', async (data) => {
    console.log('sendMessage event received:', data);

    try {
      const { content, senderId, receiverId } = data;

      const newMessage = await Message.create({ content, senderId, receiverId });

      // Emit to both users
      io.to(senderId).emit('receiveMessage', newMessage);
      io.to(receiverId).emit('receiveMessage', newMessage);

      console.log('Message sent successfully:', newMessage);
    } catch (error) {
      console.error('Error handling sendMessage:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

});
module.exports = { io, server };