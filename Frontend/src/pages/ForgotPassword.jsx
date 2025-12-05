import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/api";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side check for empty email
    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    console.log("Sending email to backend:", email); // Debugging

    try {
      const data = await forgotPassword(email);
      console.log("Backend response:", data); // Debugging

      setMessage(data.message || "Reset link sent successfully!");

      // Navigate to OTP verification page only if OTP was sent
      if (data.message === "OTP sent to your email") {
        navigate("/verify-otp", { state: { email } });
      }
    } catch (err) {
      // Show exact backend error message if available
      console.log("Error caught:", err); // Debugging

      if (err.message) {
        setMessage(err.message);
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="forgot-password-input"
        />
        <button type="submit" className="forgot-password-button">
          Submit
        </button>
      </form>
      {message && <p className="forgot-password-message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
