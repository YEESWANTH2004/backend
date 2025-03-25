const express = require("express");
const router = express.Router();
const chatController = require("../../controllers/farmers/chatController");

// Send message
router.post("/send", chatController.sendMessage);

// Get messages between two users
router.get("/:sender/:receiver", chatController.getMessagesBetweenUsers);

module.exports = router;
