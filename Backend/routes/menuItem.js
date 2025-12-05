const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

router.get("/restaurant/:restaurantId", async (req, res) => {
  try {
    const menuItem = await MenuItem.find({
      restaurantId: req.params.restaurantId,
    });
    res.status(200).json(menuItem);
  } catch (error) {
    console.log("Failed to fetch menuItem", error);
  }
});

module.exports = router;








