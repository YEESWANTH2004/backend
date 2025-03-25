const express = require("express");
const router = express.Router();
const negotiationController = require("../../controllers/farmers/negotiationController");

// Create a new negotiation
// router.post("/", negotiationController.createNegotiation);
router.post("/", negotiationController.startNegotiation);

// Get a negotiation by ID
router.get("/:id", negotiationController.getNegotiation);

// Update negotiation (price updates or status changes)
router.put("/:id", negotiationController.updateNegotiation);

// Delete a negotiation
router.delete("/:id", negotiationController.deleteNegotiation);

// Add a message to the negotiation chat
router.post("/:id/message", negotiationController.addMessage);

module.exports = router;
