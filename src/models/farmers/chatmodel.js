const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, refPath: "senderModel", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, refPath: "receiverModel", required: true },
  senderModel: { type: String, enum: ["User", "Farmer"], required: true },
  receiverModel: { type: String, enum: ["User", "Farmer"], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chat", ChatSchema);
