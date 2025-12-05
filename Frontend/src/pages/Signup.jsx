import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import { signupAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { name, email, phone, password };
      const data = await signupAPI(userData);

      // Save token to localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Save user data to context
      if (data.user) {
        login(data.user);
      }

      alert("Signup successful!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        <p className="auth-subtitle">
          Join us and start ordering your favorite food
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
          <button type="submit">Sign Up</button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;