const Chat = require("../../models/farmers/chatmodel")

const sendMessage = async (sender, receiver, senderModel, receiverModel, message) => {
  try {
    const chatMessage = new Chat({ sender, receiver, senderModel, receiverModel, message });
    await chatMessage.save();
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
    }).sort({ timestamp: 1 }); // Sort by time (oldest first)
    return messages;
  } catch (error) {
    throw new Error("Error retrieving messages: " + error.message);
  }
};

module.exports = { sendMessage, getMessagesBetweenUsers };
