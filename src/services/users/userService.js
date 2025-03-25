const { User, Otp } = require("../../models/users/usermodel");
const Farmer = require("../../models/farmers/farmermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendOtp = require("../../utils/sendOtp");

const registerUser = async (data) => {
  try {
    console.log("data reached herer");
    const { name, email, phone, password, address } = data;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
    });
    await newUser.save();

    return newUser;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

const loginUser = async (data) => {
  try {
    const { email, password, userType } = data;

    // Find user
    let user;
    if (userType == "User") {
      user = await User.findOne({ email });
    } else {
      user = await Farmer.findOne({ email });
    }
    if (!user) throw new Error("Invalid email or password or type");

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    // Generate OTP (6-digit)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 minutes

    // Upsert (Insert if not exist, update if exists)
    await Otp.findOneAndUpdate(
      { userId: user._id },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    // Send OTP to the user's email
    await sendOtp(user.email, otp);

    return { message: "OTP sent to your email", userId: user._id };
  } catch (error) {
    throw new Error(error.message);
  }
};

const verifyOtp = async (data) => {
  try {
    const { userId, otp } = data;

    // Find the OTP record
    const otpRecord = await Otp.findOne({ userId });
    if (!otpRecord) throw new Error("OTP not found");

    // Check if OTP is valid
    if (otpRecord.otp !== otp) throw new Error("Invalid OTP");
    if (otpRecord.expiresAt < new Date()) throw new Error("OTP expired");

    // Delete OTP after successful verification
    await Otp.deleteOne({ userId });

    // Generate JWT token after successful OTP verification
    const token = jwt.sign({ id: userId }, "your_secret_key", {
      expiresIn: "1d",
    });

    return { message: "OTP verified successfully", token };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfile = async (userId) => {
  try {
    console.log(userId);
    return await User.findById(userId).select("-password");
  } catch (error) {
    throw new Error("Error fetching user profile: " + error.message);
  }
};

const updateUserProfile = async (userId, data) => {
  try {
    return await User.findByIdAndUpdate(userId, data, { new: true }).select(
      "-password"
    );
  } catch (error) {
    throw new Error("Error updating profile: " + error.message);
  }
};

const addToCart = async (userId, cartItem) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Check if product is already in cart
    const existingItem = user.cart.find(
      (item) => item.product.toString() === cartItem.product
    );
    if (existingItem) {
      existingItem.quantity += cartItem.quantity;
    } else {
      user.cart.push(cartItem);
    }

    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error adding to cart: " + error.message);
  }
};

const removeFromCart = async (userId, productId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );
    await user.save();

    return user;
  } catch (error) {
    throw new Error("Error removing from cart: " + error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addToCart,
  removeFromCart,
  verifyOtp,
};
