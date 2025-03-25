const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/farmers/orderController");

// Create a new order
router.post("/", orderController.createOrder);

// Get a specific order
router.get("/:id", orderController.getOrder);

// Get orders by buyer
router.get("/buyer/:buyerId", orderController.getOrdersByBuyer);

// Get orders by farmer
router.get("/farmer/:farmerId", orderController.getOrdersByFarmer);

// Update order status
router.put("/:id/status", orderController.updateOrderStatus);

// Delete an order
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
