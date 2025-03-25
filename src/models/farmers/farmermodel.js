const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  farmName: { type: String },
  location: { type: String },
  profileImage: { type: String },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Farmer", FarmerSchema);
