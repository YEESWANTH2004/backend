const Farmer = require("../../models/farmers/farmermodel");
const bcrypt = require("bcryptjs");

const registerFarmer = async (data) => {
  try {
    const { email, password } = data;
    const existingFarmer = await Farmer.findOne({ email });
    if (existingFarmer) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const farmer = new Farmer({ ...data, password: hashedPassword });
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
