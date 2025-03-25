const express = require("express");
const router = express.Router();
const productController = require("../../controllers/farmers/productController");

// Create a new product
router.post("/", productController.createProduct);

// Get a specific product
router.get("/:id", productController.getProduct);

// Get all products
router.get("/", productController.getAllProducts);

// Get products by farmer
router.get("/farmer/:farmerId", productController.getProductsByFarmer);

// Update product details
router.put("/:id", productController.updateProduct);

// Delete a product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
