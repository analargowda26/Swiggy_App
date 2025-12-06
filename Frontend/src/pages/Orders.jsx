import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token"); // Get JWT token
      const response = await axios.get(
        "http://localhost:5000/api/orders/user", // Updated backend route
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );

      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="orders-loading">Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <h2>No orders yet</h2>
        <p>Start ordering from your favorite restaurants!</p>
        <button onClick={() => navigate("/")}>Browse Restaurants</button>
      </div>
    );
  }

  return (
    <div className="orders-container page-transition">
      <h2>My Orders</h2>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <h3>{order.restaurantId?.name || "Restaurant"}</h3>
              <span className={`order-status ${order.status}`}>
                {order.status}
              </span>
            </div>

            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-address">
                <strong>Delivery Address:</strong>
                <p>{order.deliveryAddress}</p>
              </div>
              <div className="order-total">
                <strong>Total: ₹{order.totalPrice}</strong>
              </div>
            </div>

            <div className="order-date">
              Ordered on {new Date(order.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
