import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { resetPassword } from "../services/api";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const email = location.state?.email; // get email from previous page

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const data = await resetPassword({ email, password });
      setMessage(data.message || "Password has been reset successfully!");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage(err.message || "Something went wrong");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="reset-password-input"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="reset-password-input"
        />
        <button type="submit" className="reset-password-button">
          Reset Password
        </button>
      </form>
      {message && <p className="reset-password-message">{message}</p>}
    </div>
  );
};

export default ResetPassword;
