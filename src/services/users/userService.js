const User = require("../../routes/users/userRoutes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (data) => {
  try {
    const { name, email, phone, password, address } = data;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, phone, password: hashedPassword, address });
    await newUser.save();

    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async (data) => {
  try {
    const { email, password } = data;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password");

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    // Generate token
    const token = jwt.sign({ id: user._id }, "your_secret_key", { expiresIn: "1d" });

    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfile = async (userId) => {
  try {
    return await User.findById(userId).select("-password");
  } catch (error) {
    throw new Error("Error fetching user profile: " + error.message);
  }
};

const updateUserProfile = async (userId, data) => {
  try {
    return await User.findByIdAndUpdate(userId, data, { new: true }).select("-password");
  } catch (error) {
    throw new Error("Error updating profile: " + error.message);
  }
};

const addToCart = async (userId, cartItem) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Check if product is already in cart
    const existingItem = user.cart.find(item => item.product.toString() === cartItem.product);
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

    user.cart = user.cart.filter(item => item.product.toString() !== productId);
    await user.save();

    return user;
  } catch (error) {
    throw new Error("Error removing from cart: " + error.message);
  }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile, addToCart, removeFromCart };
