import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="brand-logo">Swiggy</div>
            <h1 className="hero-title">Craving something delicious?</h1>
            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </button>
              <button
                className="btn-secondary"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
              alt="Delicious food"
              className="food-image"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🍕</div>
            <h3>Wide Selection</h3>
            <p>Choose from hundreds of restaurants and cuisines</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast Delivery</h3>
            <p>Get your food delivered hot and fresh in minutes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Easy Payment</h3>
            <p>Multiple payment options for your convenience</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Top Rated</h3>
            <p>Only the best restaurants with great reviews</p>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-icon">📱</div>
            <h3>Choose Your Food</h3>
            <p>
              Browse through hundreds of restaurants and select your favorite
              dishes
            </p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-icon">🛒</div>
            <h3>Add to Cart</h3>
            <p>Add items to your cart and customize your order as you like</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-icon">💳</div>
            <h3>Place Order</h3>
            <p>Enter your delivery address and confirm your order</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-icon">🚀</div>
            <h3>Enjoy!</h3>
            <p>Sit back and relax while we deliver hot food to your doorstep</p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Swiggy</h3>
            <p>Your favorite food delivered fresh and fast</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="#careers">Careers</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>For Restaurants</h4>
            <ul>
              <li>
                <a href="#partner">Partner With Us</a>
              </li>
              <li>
                <a href="#apps">Apps for You</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>📧 support@swiggy.com</p>
            <p>📞 +91 1800-123-4567</p>
            <div className="social-links">
              <a href="#facebook">📘</a>
              <a href="#twitter">🐦</a>
              <a href="#instagram">📷</a>
              <a href="#linkedin">💼</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2025 Swiggy Clone. All rights reserved. Built as a portfolio
            project.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;