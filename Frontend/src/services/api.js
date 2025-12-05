import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

// Auth APIs
export const signupAPI = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

export const loginAPI = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

// Restaurants APIs
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

// Orders APIs
export const createOrderAPI = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export const getUserOrdersAPI = async (userId) => {
  const response = await api.get(`/orders/user/${userId}`);
  return response.data;
};

export const getOrderByIdAPI = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

<<<<<<< HEAD
// Reviews APIs
=======
// ⭐ GET Reviews
>>>>>>> deae9137424443e3aa1a99afc1c7f93137feb1b1
export const getReviewsAPI = async (id) => {
  const res = await axios.get(`${API_URL}/restaurants/${id}/reviews`);
  return res.data.reviews;
};

<<<<<<< HEAD
export const addReviewAPI = async (id, data) => {
  const res = await axios.post(`${API_URL}/restaurants/${id}/reviews`, data);
  return res.data;
};

// ✅ Password reset flow APIs (updated for robust error handling)
export const forgotPassword = async (email) => {
  try {
    if (!email) throw new Error("Email is required");
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (err) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await api.post("/auth/verify-otp", data);
    return response.data;
  } catch (err) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
  } catch (err) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};
=======
// ⭐ POST Review
export const addReviewAPI = async (id, data) => {
  const res = await axios.post(`${API_URL}/restaurants/${id}/reviews`, data);
  return res.data;
};
>>>>>>> deae9137424443e3aa1a99afc1c7f93137feb1b1
