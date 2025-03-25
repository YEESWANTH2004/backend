const UserService = require("../../services/users/userService");

const registerUser = async (req, res) => {
  try {
    const user = await UserService.registerUser(req.body);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log("login controller");
    const token = await UserService.loginUser(req.body);
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

const validateOtp = async (req, res) => {
  try {
    const response = await UserService.verifyOtp(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await UserService.getUserProfile(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await UserService.updateUserProfile(
      req.user.id,
      req.body
    );
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const updatedUser = await UserService.addToCart(req.user.id, req.body);
    res.status(200).json({ success: true, cart: updatedUser.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const updatedUser = await UserService.removeFromCart(
      req.user.id,
      req.params.productId
    );
    res.status(200).json({ success: true, cart: updatedUser.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addToCart,
  removeFromCart,
};
