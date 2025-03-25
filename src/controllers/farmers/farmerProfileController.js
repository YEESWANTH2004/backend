const FarmerProfileService = require("../../services/farmers/farmerProfileService");

const createOrUpdateProfile = async (req, res) => {
  try {
    const profile = await FarmerProfileService.createOrUpdateProfile(req.body);
    res.status(201).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getFarmerProfile = async (req, res) => {
  try {
    const profile = await FarmerProfileService.getFarmerProfile(req.params.id);
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteFarmerProfile = async (req, res) => {
  try {
    await FarmerProfileService.deleteFarmerProfile(req.params.id);
    res.status(200).json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createOrUpdateProfile, getFarmerProfile, deleteFarmerProfile };
