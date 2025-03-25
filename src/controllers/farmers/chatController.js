const ChatService = require("../../services/farmers/chatService");

const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, senderModel, receiverModel, message } = req.body;
    const chatMessage = await ChatService.sendMessage(sender, receiver, senderModel, receiverModel, message);
    res.status(201).json({ success: true, chatMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMessagesBetweenUsers = async (req, res) => {
  try {
    const { sender, receiver } = req.params;
    const messages = await ChatService.getMessagesBetweenUsers(sender, receiver);
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { sendMessage, getMessagesBetweenUsers };
