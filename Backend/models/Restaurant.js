const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    cuisine: {
      type: [String],
      required: true,
    },

    // ⭐ NEW: Reviews array
    reviews: [
      {
        user: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // ⭐ NEW: Auto-calculated rating (optional)
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    deliveryTime: {
      type: String,
      required: true,
    },
    foodType: {
      type: String,
      enum: ["veg", "non-veg"],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ⭐ NEW METHOD: calculate average rating from reviews
restaurantSchema.methods.getAverageRating = function () {
  if (!this.reviews || this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
  return Math.round((sum / this.reviews.length) * 10) / 10; // 1 decimal point
};

module.exports = mongoose.model("Restaurant", restaurantSchema);
