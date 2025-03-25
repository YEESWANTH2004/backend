const NegotiationService = require("../../services/farmers/negotiationService");

const startNegotiation = async (req, res) => {
  try {
    const negotiation = await NegotiationService.startNegotiation(req.body);
    res.status(201).json({ success: true, negotiation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getNegotiation = async (req, res) => {
  try {
    const negotiation = await NegotiationService.getNegotiation(req.params.id);
    if (!negotiation) return res.status(404).json({ success: false, message: "Negotiation not found" });

    res.status(200).json({ success: true, negotiation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateNegotiation = async (req, res) => {
  try {
    const updatedNegotiation = await NegotiationService.updateNegotiation(req.params.id, req.body);
    res.status(200).json({ success: true, updatedNegotiation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addMessage = async (req, res) => {
  try {
    const negotiation = await NegotiationService.addMessage(req.params.id, req.body);
    res.status(200).json({ success: true, negotiation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteNegotiation = async (req, res) => {
  try {
    await NegotiationService.deleteNegotiation(req.params.id);
    res.status(200).json({ success: true, message: "Negotiation deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { startNegotiation, getNegotiation, updateNegotiation, addMessage, deleteNegotiation };
