const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/auth");

// Create a new order (protected route)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { restaurantId, items, totalPrice, deliveryAddress } = req.body;

    // Use userId from authenticated token
    const order = new Order({
      userId: req.user.id,
      restaurantId,
      items,
      totalPrice,
      deliveryAddress,
    });

    await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// Get all orders for the logged-in user (protected route)
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Get userId from JWT token

    const orders = await Order.find({ userId })
      .populate("restaurantId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// Get single order by ID (protected route)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("restaurantId")
      .populate("userId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;
