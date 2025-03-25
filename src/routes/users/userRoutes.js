const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users/userController");
const authMiddleware = require("../../middlewares/authmiddleware");

// User Authentication
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/verify-otp", userController.validateOtp);

// Profile Routes
router.get("/profile", authMiddleware, userController.getUserProfile);
router.put("/profile", authMiddleware, userController.updateUserProfile);

// Cart Routes
router.post("/cart", authMiddleware, userController.addToCart);
router.delete(
  "/cart/:productId",
  authMiddleware,
  userController.removeFromCart
);

module.exports = router;
