const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  profileImage: { type: String },
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  createdAt: { type: Date, default: Date.now },
});

const OtpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "userType",
  },
  userType: { type: String, required: true, enum: ["User", "Farmer"] }, // Determines the referenced model
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const User = mongoose.model("User", UserSchema);
const Otp = mongoose.model("Otp", OtpSchema);

module.exports = { User, Otp };
