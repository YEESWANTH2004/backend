const mongoose = require("mongoose");

const NegotiationSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  initialPrice: { type: Number, required: true }, // Original price set by farmer
  offeredPrice: { type: Number, required: true }, // Latest price offered by the buyer
  farmerResponse: { type: Number }, // Latest counteroffer from the farmer
  status: { 
    type: String, 
    enum: ["Pending", "Accepted", "Rejected"], 
    default: "Pending" 
  },
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, refPath: "senderModel", required: true },
      senderModel: { type: String, enum: ["User", "Farmer"], required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Negotiation", NegotiationSchema);
