import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { loginAPI } from "../services/api";
import { useUser } from "../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const credentials = { email, password };
      const data = await loginAPI(credentials);

      console.log("Login successful:", data);

      // Save token to localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Save user data to context
      login(data.user || data);

      // Navigate to home page
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Login to continue ordering delicious food</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* 🔹 Forgot Password Link */}
          <p className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>

          <button type="submit">Login</button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
