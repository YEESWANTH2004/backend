const Farmer = require("../../models/farmers/farmermodel");

const registerFarmer = async (data) => {
  try {
    const farmer = new Farmer(data);
    await farmer.save();
    return farmer;
  } catch (error) {
    throw new Error("Error registering farmer: " + error.message);
  }
};

const getFarmerById = async (id) => {
  try {
    return await Farmer.findById(id).populate("products").populate("orders");
  } catch (error) {
    throw new Error("Error retrieving farmer: " + error.message);
  }
};

const updateFarmer = async (id, data) => {
  try {
    return await Farmer.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error("Error updating farmer: " + error.message);
  }
};

const deleteFarmer = async (id) => {
  try {
    return await Farmer.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error deleting farmer: " + error.message);
  }
};

module.exports = { registerFarmer, getFarmerById, updateFarmer, deleteFarmer };
