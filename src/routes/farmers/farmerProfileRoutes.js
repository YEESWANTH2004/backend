const express = require("express");
const router = express.Router();
const farmerProfileController = require("../../controllers/farmers/farmerProfileController");

// Create or Update Farmer Profile
router.post("/", farmerProfileController.createOrUpdateProfile);

// Get Farmer Profile by Farmer ID
router.get("/:id", farmerProfileController.getFarmerProfile);

// Delete Farmer Profile
router.delete("/:id", farmerProfileController.deleteFarmerProfile);

module.exports = router;
