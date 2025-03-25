const Product = require("../../models/farmers/productmodel");

const createProduct = async (data) => {
  try {
    const product = new Product(data);
    await product.save();
    return product;
  } catch (error) {
    throw new Error("Error creating product: " + error.message);
  }
};

const getProduct = async (productId) => {
  try {
    return await Product.findById(productId).populate("farmer", "name email");
  } catch (error) {
    throw new Error("Error retrieving product: " + error.message);
  }
};

const getProductsByFarmer = async (farmerId) => {
  try {
    return await Product.find({ farmer: farmerId });
  } catch (error) {
    throw new Error("Error retrieving farmer's products: " + error.message);
  }
};

const getAllProducts = async () => {
  try {
    return await Product.find();
  } catch (error) {
    throw new Error("Error retrieving all products: " + error.message);
  }
};

const updateProduct = async (productId, data) => {
  try {
    return await Product.findByIdAndUpdate(productId, data, { new: true });
  } catch (error) {
    throw new Error("Error updating product: " + error.message);
  }
};

const deleteProduct = async (productId) => {
  try {
    return await Product.findByIdAndDelete(productId);
  } catch (error) {
    throw new Error("Error deleting product: " + error.message);
  }
};

module.exports = { createProduct, getProduct, getProductsByFarmer, getAllProducts, updateProduct, deleteProduct };
