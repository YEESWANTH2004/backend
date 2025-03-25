const Negotiation = require("../../models/farmers/negotiationmodel");

const createNegotiation = async (data) => {
  try {
    const negotiation = new Negotiation(data);
    await negotiation.save();
    return negotiation;
  } catch (error) {
    throw new Error("Error creating negotiation: " + error.message);
  }
};

const getNegotiation = async (negotiationId) => {
  try {
    return await Negotiation.findById(negotiationId)
      .populate("buyer", "name email")
      .populate("farmer", "name email")
      .populate("product", "name price");
  } catch (error) {
    throw new Error("Error retrieving negotiation: " + error.message);
  }
};

const updateNegotiation = async (negotiationId, data) => {
  try {
    return await Negotiation.findByIdAndUpdate(negotiationId, data, { new: true });
  } catch (error) {
    throw new Error("Error updating negotiation: " + error.message);
  }
};

const deleteNegotiation = async (negotiationId) => {
  try {
    return await Negotiation.findByIdAndDelete(negotiationId);
  } catch (error) {
    throw new Error("Error deleting negotiation: " + error.message);
  }
};

const addMessage = async (negotiationId, messageData) => {
  try {
    const negotiation = await Negotiation.findById(negotiationId);
    if (!negotiation) throw new Error("Negotiation not found");

    negotiation.messages.push(messageData);
    negotiation.updatedAt = Date.now();
    await negotiation.save();

    return negotiation;
  } catch (error) {
    throw new Error("Error adding message: " + error.message);
  }
};

module.exports = { createNegotiation, getNegotiation, updateNegotiation, deleteNegotiation, addMessage };
