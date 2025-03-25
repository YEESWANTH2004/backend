const FarmerService = require("../../services/farmers/farmerService");

const registerFarmer = async (req, res) => {
  try {
    const farmer = await FarmerService.registerFarmer(req.body);
    res.status(201).json({ success: true, farmer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getFarmerById = async (req, res) => {
  try {
    const farmer = await FarmerService.getFarmerById(req.params.id);
    if (!farmer) return res.status(404).json({ success: false, message: "Farmer not found" });

    res.status(200).json({ success: true, farmer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateFarmer = async (req, res) => {
  try {
    const updatedFarmer = await FarmerService.updateFarmer(req.params.id, req.body);
    res.status(200).json({ success: true, farmer: updatedFarmer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteFarmer = async (req, res) => {
  try {
    await FarmerService.deleteFarmer(req.params.id);
    res.status(200).json({ success: true, message: "Farmer deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerFarmer, getFarmerById, updateFarmer, deleteFarmer };
