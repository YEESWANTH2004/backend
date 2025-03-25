// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// // Load environment variables
// dotenv.config();

// // Connect to Database
// connectDB();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Import Routes
// const authRoutes = require("./routes/authRoutes");
// const productRoutes = require("./routes/productRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const chatRoutes = require("./routes/chatRoutes");

// // Use Routes
// // app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/farmer", farmerRoutes);
// app.use("/api/negotiation", negotiationRoutes);
// app.use("/api/users", userRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const { createClient } = require("redis");
const { Server } = require("socket.io");
const http = require("http");
const Chat = require("./src/models/farmers/chatmodel"); // Import chat model

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Redis Client
const redisClient = createClient();
redisClient.connect().catch(console.error);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust based on your frontend URL
    methods: ["GET", "POST"],
  },
});

const onlineUsers = new Map(); // Fallback storage for socket IDs

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Store user socket ID in Redis
  socket.on("registerUser", async (userId) => {
    await redisClient.set(`user:${userId}`, socket.id);
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} registered with socket ID ${socket.id}`);
  });

  // Handle message sending
  socket.on("sendMessage", async (data) => {
    const { sender, receiver, message } = data;

    try {
      // Save message in MongoDB
      const chatMessage = new Chat({ sender, receiver, message });
      await chatMessage.save();

      // Retrieve receiver's socket ID from Redis
      const receiverSocketId = await redisClient.get(`user:${receiver}`);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", chatMessage);
        console.log(
          `Message sent to user ${receiver} via socket ${receiverSocketId}`
        );
      } else {
        console.log(`User ${receiver} is offline. Message stored in DB.`);
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  });

  // Handle user disconnection
  socket.on("disconnect", async () => {
    let userIdToRemove = null;
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        userIdToRemove = userId;
        break;
      }
    }
    if (userIdToRemove) {
      await redisClient.del(`user:${userIdToRemove}`);
      onlineUsers.delete(userIdToRemove);
      console.log(`User ${userIdToRemove} disconnected`);
    }
  });
});

// Import Routes
const authRoutes = require("./src/auth/auth");
const productRoutes = require("./src/routes/farmers/productRoutes");
const orderRoutes = require("./src/routes/farmers/orderRoutes");
const chatRoutes = require("./src/routes/farmers/chatRoutes");
const farmerRoutes = require("./src/routes/farmers/farmerRoutes");
const negotiationRoutes = require("./src/routes/farmers/negotiationRoutes");
const userRoutes = require("./src/routes/users/userRoutes");

// Use Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/negotiation", negotiationRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
