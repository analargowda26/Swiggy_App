import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ---------------- AUTH APIs ----------------
export const signupAPI = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

export const loginAPI = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

// ---------------- RESTAURANTS ----------------
export const getRestaurantsAPI = async () => {
  const response = await api.get("/restaurants");
  return response.data.restaurants;
};

export const getRestaurantByIdAPI = async (id) => {
  const response = await api.get(`/restaurants/${id}`);
  return response.data.restaurant;
};

export const getMenuItemsAPI = async (restaurantId) => {
  const response = await api.get(`/menu-items/restaurant/${restaurantId}`);
  return response.data;
};

// ---------------- ORDERS ----------------
export const createOrderAPI = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

// Updated: no userId parameter needed
export const getUserOrdersAPI = async () => {
  const response = await api.get("/orders/user");
  return response.data;
};

export const getOrderByIdAPI = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

// ---------------- REVIEWS ----------------
// Use `api` instance to include auth headers if needed
export const getReviewsAPI = async (id) => {
  const res = await api.get(`/restaurants/${id}/reviews`);
  return res.data.reviews;
};

export const addReviewAPI = async (id, data) => {
  const res = await api.post(`/restaurants/${id}/reviews`, data);
  return res.data;
};

// ---------------- PASSWORD RESET ----------------
export const forgotPassword = async (email) => {
  try {
    if (!email) throw new Error("Email is required");
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Something went wrong. Please try again.");
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await api.post("/auth/verify-otp", data);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Something went wrong. Please try again.");
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Something went wrong. Please try again.");
  }
};
