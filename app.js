const Chat = require("./");
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

const getMessagesBetweenUsers = async (sender, receiver) => {
  try {
    const messages = await Chat.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ timestamp: 1 });

    return messages;
  } catch (error) {
    throw new Error("Error retrieving messages: " + error.message);
  }
};

module.exports = { sendMessage, getMessagesBetweenUsers };
