const mongoose = require("mongoose");

const FarmerProfileSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true },
  bio: { type: String },
  experience: { type: String },
  certifications: [{ type: String }], 
  farmImages: [{ type: String }], 
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FarmerProfile", FarmerProfileSchema);
