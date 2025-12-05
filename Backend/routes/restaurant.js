const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

// -------------------------
// Get ALL restaurants
// -------------------------
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({
      message: "Get all restaurants",
      restaurants: restaurants,
    });
  } catch (error) {
    console.log("Error Fetching restaurants", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// -------------------------
// Get SINGLE restaurant
// -------------------------
router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      message: "Get restaurant successfully",
      restaurant: restaurant,
    });
  } catch (error) {
    console.log("Error Fetching restaurant", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// ------------------------------------------------------
// ⭐ NEW ROUTE → GET all reviews for a restaurant
// ------------------------------------------------------
router.get("/:id/reviews", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({
      message: "Reviews fetched successfully",
      reviews: restaurant.reviews,
    });
  } catch (error) {
    console.log("Error fetching reviews", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------------------------------------------
// ⭐ NEW ROUTE → POST a new review + update rating
// ------------------------------------------------------
router.post("/:id/reviews", async (req, res) => {
  try {
    const { user, rating, comment } = req.body;

    if (!user || !rating) {
      return res.status(400).json({
        message: "User name and rating are required",
      });
    }

    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    // Add new review
    restaurant.reviews.push({
      user,
      rating,
      comment,
    });

    // Update restaurant average rating
    restaurant.rating = restaurant.getAverageRating();

    await restaurant.save();

    res.status(201).json({
      message: "Review added successfully",
      reviews: restaurant.reviews,
      updatedRating: restaurant.rating,
    });
  } catch (error) {
    console.log("Error adding review", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
