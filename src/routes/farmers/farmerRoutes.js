const express = require("express");
const router = express.Router();
const farmerController = require("../../controllers/farmers/farmerController");

// Register Farmer
router.post("/register", farmerController.registerFarmer);

// Get Farmer by ID
router.get("/:id", farmerController.getFarmerById);

// Update Farmer
router.put("/:id", farmerController.updateFarmer);

// Delete Farmer
router.delete("/:id", farmerController.deleteFarmer);

module.exports = router;
