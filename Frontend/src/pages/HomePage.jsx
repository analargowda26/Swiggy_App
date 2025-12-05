import React, { useState, useEffect } from "react";
import { getRestaurantsAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [foodTypeFilter, setFoodTypeFilter] = useState("all");
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const data = await getRestaurantsAPI();
      setRestaurants(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.cuisine.some((c) => c.toLowerCase().includes(query));

    const matchesFoodType =
      foodTypeFilter === "all" || restaurant.foodType === foodTypeFilter;

    return matchesSearch && matchesFoodType;
  });

  return (
    <div className="home-container page-transition">
      <h2>Restaurants Near You</h2>
      <input
        type="text"
        className="search-input"
        placeholder="Search restaurants or cuisines..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="filter-buttons">
        <button
          className={`filter-btn ${foodTypeFilter === "all" ? "active" : ""}`}
          onClick={() => setFoodTypeFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-btn ${foodTypeFilter === "veg" ? "active" : ""}`}
          onClick={() => setFoodTypeFilter("veg")}
        >
          🟢 Veg
        </button>
        <button
          className={`filter-btn ${
            foodTypeFilter === "non-veg" ? "active" : ""
          }`}
          onClick={() => setFoodTypeFilter("non-veg")}
        >
          🔴 Non-Veg
        </button>
      </div>
      {filteredRestaurants.length === 0 ? (
        <p className="no-restaurants">
          {restaurants.length === 0
            ? "No restaurants available"
            : "No restaurants found matching your search"}
        </p>
      ) : (
        <div className="restaurant-grid">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="restaurant-card"
              onClick={() => navigate(`/restaurant/${restaurant._id}`)}
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="restaurant-image"
              />
              <div className="restaurant-info">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <p className="restaurant-cuisine">
                  {restaurant.cuisine.join(", ")}
                </p>
                <div className="restaurant-details">
                  <span className="rating">⭐ {restaurant.rating}</span>
                  <span>{restaurant.deliveryTime}</span>
                  <span className={`food-type ${restaurant.foodType}`}>
                    {restaurant.foodType === "veg" ? "🟢 Veg" : "🔴 Non-Veg"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;