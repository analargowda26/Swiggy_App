import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  getRestaurantByIdAPI, 
  getMenuItemsAPI,
  getReviewsAPI,
  addReviewAPI
} from "../services/api";

import "./RestaurantDetail.css";
import { useCart } from "../context/CartContext";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedItemId, setAddedItemId] = useState(null);

  // 🔍 Search
  const [searchTerm, setSearchTerm] = useState("");

  // ⭐ Reviews
  const [reviews, setReviews] = useState([]);
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const { addToCart } = useCart();

  useEffect(() => {
    fetchRestaurantAndMenu();
    fetchReviews();
  }, [id]);

  const fetchRestaurantAndMenu = async () => {
    try {
      const restaurantData = await getRestaurantByIdAPI(id);
      const menuData = await getMenuItemsAPI(id);

      setRestaurant(restaurantData);
      setMenuItems(menuData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // ⭐ Fetch Reviews
  const fetchReviews = async () => {
    try {
      const data = await getReviewsAPI(id);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // ⭐ Submit Review
  const handleSubmitReview = async () => {
    if (!userName || rating === 0) {
      alert("Please enter your name and rating!");
      return;
    }

    try {
      await addReviewAPI(id, {
        user: userName,
        rating: rating,
        comment: comment,
      });

      setUserName("");
      setComment("");
      setRating(0);

      fetchRestaurantAndMenu();
      fetchReviews();

      alert("Review submitted!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review");
    }
  };

  // 🔍 Filter Menu Items
  const filteredMenu = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!restaurant) {
    return <div className="detail-error">Restaurant not found</div>;
  }

  return (
    <div className="detail-container page-transition">

      {/* ------------------ HEADER ------------------ */}
      <div className="detail-header">

        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="detail-image"
        />

        <div className="detail-info">

          {/* NAME + SEARCH BAR ROW */}
          <div className="detail-header-top">
            <h2 className="detail-name">{restaurant.name}</h2>

            <input
              type="text"
              className="search-bar"
              placeholder="Search food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <p className="detail-cuisine">{restaurant.cuisine.join(", ")}</p>

          <div className="detail-stats">
            <div className="detail-stat">
              <span className="detail-stat-label">Rating</span>
              <span className="detail-rating">⭐ {restaurant.rating}</span>
            </div>

            <div className="detail-stat">
              <span className="detail-stat-label">Delivery Time</span>
              <span className="detail-stat-value">
                {restaurant.deliveryTime}
              </span>
            </div>

            <div className="detail-stat">
              <span className="detail-stat-label">Food Type</span>
              <span className={`detail-food-type ${restaurant.foodType}`}>
                {restaurant.foodType === "veg" ? "🟢 Veg" : "🔴 Non-Veg"}
              </span>
            </div>
          </div>

          <div className="detail-address">
            <h3>Address</h3>
            <p>{restaurant.address}</p>
          </div>
        </div>
      </div>

      {/* ------------------ MENU SECTION ------------------ */}
      <div className="menu-section">
        <h2>Menu</h2>

        {filteredMenu.length === 0 ? (
          <p style={{ fontSize: "18px", marginTop: "10px", color: "gray" }}>
            No food items found.
          </p>
        ) : (
          <div className="menu-grid">

            {filteredMenu.map((item) => (
              <div key={item._id} className="menu-item-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="menu-item-image"
                />

                <div className="menu-item-info">
                  <div className="menu-item-header">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <span className={`menu-food-type ${item.foodType}`}>
                      {item.foodType === "veg" ? "🟢" : "🔴"}
                    </span>
                  </div>

                  <p className="menu-item-description">{item.description}</p>

                  <div className="menu-item-footer">
                    <span className="menu-item-price">₹{item.price}</span>

                    <div
                      className="add-button"
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart({ ...item, restaurantId: restaurant._id });
                        setAddedItemId(item._id);

                        setTimeout(() => setAddedItemId(null), 2000);
                      }}
                    >
                      {addedItemId === item._id ? "Added ✓" : "Add"}
                    </div>

                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>


      {/* ------------------ ⭐ REVIEWS SECTION ------------------ */}
      <div className="review-section">
        <h2>Customer Reviews</h2>

        {/* REVIEW LIST */}
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          <div className="review-list">
            {reviews.map((rev, index) => (
              <div key={index} className="review-card">
                <h4>{rev.user}</h4>
                <p>⭐ {rev.rating}</p>
                <p>{rev.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* ADD REVIEW FORM */}
        <div className="add-review-form">
          <h3>Write a Review</h3>

          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="review-input"
          />

          <textarea
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="review-textarea"
          />

          {/* ⭐ Star Rating */}
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                className={rating >= num ? "star active" : "star"}
                onClick={() => setRating(num)}
              >
                ★
              </span>
            ))}
          </div>

          <button className="submit-review" onClick={handleSubmitReview}>
            Submit Review
          </button>
        </div>
      </div>

    </div>
  );
};

export default RestaurantDetail;
