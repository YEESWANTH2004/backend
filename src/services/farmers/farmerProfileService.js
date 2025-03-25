const FarmerProfile = require("../../models/farmers/farmerprofilemodel");

const createOrUpdateProfile = async (data) => {
  try {
    const { farmer } = data;
    let profile = await FarmerProfile.findOne({ farmer });

    if (profile) {
      profile = await FarmerProfile.findOneAndUpdate({ farmer }, data, { new: true });
    } else {
      profile = new FarmerProfile(data);
      await profile.save();
    }

    return profile;
  } catch (error) {
    throw new Error("Error creating/updating profile: " + error.message);
  }
};

const getFarmerProfile = async (farmerId) => {
  try {
    return await FarmerProfile.findOne({ farmer: farmerId }).populate("farmer");
  } catch (error) {
    throw new Error("Error retrieving profile: " + error.message);
  }
};

const deleteFarmerProfile = async (farmerId) => {
  try {
    return await FarmerProfile.findOneAndDelete({ farmer: farmerId });
  } catch (error) {
    throw new Error("Error deleting profile: " + error.message);
  }
};

module.exports = { createOrUpdateProfile, getFarmerProfile, deleteFarmerProfile };
