import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { createOrderAPI } from "../services/api";
import { useUser } from "../context/UserContext";
import "./Cart.css";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCart();
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { user } = useUser();

  const handleCheckout = async () => {
    if (!deliveryAddress.trim()) {
      alert("Please enter delivery address");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setIsPlacingOrder(true);

      const orderData = {
        restaurantId: cartItems[0].restaurantId,
        items: cartItems.map((item) => ({
          menuItemId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice: getTotalPrice(),
        deliveryAddress: deliveryAddress,
      };

      // Debug: Check orderData before sending
      console.log("Order data being sent:", orderData);

      const response = await createOrderAPI(orderData);
      alert("Order placed successfully!");
      clearCart();
      setDeliveryAddress("");
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      console.error("Error response:", error.response?.data);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add items from restaurants to get started!</p>
        <button onClick={() => navigate("/")}>Browse Restaurants</button>
      </div>
    );
  }

  return (
    <div className="cart-container page-transition">
      <h2>Your Cart</h2>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />

            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p className="cart-item-price">₹{item.price}</p>
            </div>

            <div className="cart-item-actions">
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="remove-button"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Delivery Address</h3>
        <textarea
          className="address-input"
          placeholder="Enter your delivery address..."
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          rows="3"
        />

        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>₹{getTotalPrice()}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>₹{getTotalPrice()}</span>
        </div>
        <button
          className="checkout-button"
          onClick={handleCheckout}
          disabled={isPlacingOrder}
        >
          {isPlacingOrder ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Cart;