const Order = require("../../models/farmers/ordermodel");

const createOrder = async (data) => {
  try {
    const order = new Order(data);
    await order.save();
    return order;
  } catch (error) {
    throw new Error("Error creating order: " + error.message);
  }
};

const getOrder = async (orderId) => {
  try {
    return await Order.findById(orderId)
      .populate("buyer", "name email")
      .populate("farmer", "name email")
      .populate("products.product", "name price");
  } catch (error) {
    throw new Error("Error retrieving order: " + error.message);
  }
};

const getOrdersByBuyer = async (buyerId) => {
  try {
    return await Order.find({ buyer: buyerId })
      .populate("products.product", "name price");
  } catch (error) {
    throw new Error("Error retrieving buyer orders: " + error.message);
  }
};

const getOrdersByFarmer = async (farmerId) => {
  try {
    return await Order.find({ farmer: farmerId })
      .populate("products.product", "name price");
  } catch (error) {
    throw new Error("Error retrieving farmer orders: " + error.message);
  }
};

const updateOrderStatus = async (orderId, status) => {
  try {
    return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  } catch (error) {
    throw new Error("Error updating order status: " + error.message);
  }
};

const deleteOrder = async (orderId) => {
  try {
    return await Order.findByIdAndDelete(orderId);
  } catch (error) {
    throw new Error("Error deleting order: " + error.message);
  }
};

module.exports = { createOrder, getOrder, getOrdersByBuyer, getOrdersByFarmer, updateOrderStatus, deleteOrder };
