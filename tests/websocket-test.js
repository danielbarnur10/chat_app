const { io } = require("socket.io-client");

// Connect to the WebSocket server
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to WebSocket server!");

  // Emit a test message
  socket.emit("sendMessage", {
    content: "Testing message from client script",
    senderId: "0d000374-3c23-460d-8db1-49ecc58659b3",
    receiverId: "36df1234-abcd-5678-ef12-9876abcde345",
  });
});

// Listen for incoming messages
socket.on("receiveMessage", (message) => {
  console.log("New message received:", message);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});