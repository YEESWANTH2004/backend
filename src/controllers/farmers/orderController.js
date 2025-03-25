const OrderService = require("../../services/farmers/orderService");

const createOrder = async (req, res) => {
  try {
    const order = await OrderService.createOrder(req.body);
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await OrderService.getOrder(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrdersByBuyer = async (req, res) => {
  try {
    const orders = await OrderService.getOrdersByBuyer(req.params.buyerId);
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrdersByFarmer = async (req, res) => {
  try {
    const orders = await OrderService.getOrdersByFarmer(req.params.farmerId);
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await OrderService.updateOrderStatus(req.params.id, req.body.status);
    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await OrderService.deleteOrder(req.params.id);
    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createOrder, getOrder, getOrdersByBuyer, getOrdersByFarmer, updateOrderStatus, deleteOrder };
