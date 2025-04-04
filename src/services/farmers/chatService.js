const Chat = require("../../models/farmers/chatmodel");
const { createClient } = require("redis");

const redisClient = createClient();
redisClient.connect().catch(console.error);

const sendMessage = async (
  io,
  sender,
  receiver,
  senderModel,
  receiverModel,
  message
) => {
  try {
    const chatMessage = new Chat({
      sender,
      receiver,
      senderModel,
      receiverModel,
      message,
    });
    await chatMessage.save();

    // Get receiver's socket ID from Redis
    const receiverSocketId = await redisClient.get(`user:${receiver}`);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", chatMessage);
      console.log(
        `Message sent to user ${receiver} via socket ${receiverSocketId}`
      );
    } else {
      console.log(`User ${receiver} is offline. Message stored in DB.`);
    }

    return chatMessage;
  } catch (error) {
    throw new Error("Error sending message: " + error.message);
  }
};

const getMessagesBetweenUsers = async (req, res) => {
  try {
    const { sender, receiver } = req.params;

    const messages = await Chat.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving messages" });
  }
};

module.exports = { sendMessage, getMessagesBetweenUsers };
