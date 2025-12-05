import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../services/api";
import "./VerifyOtp.css";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // get email from previous page

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await verifyOtp({ email, otp });
      setMessage(data.message || "OTP verified!");
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      setMessage(err.message || "Invalid OTP");
    }
  };

  return (
    <div className="verify-otp-container">
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit} className="verify-otp-form">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="verify-otp-input"
          maxLength={6}
        />
        <button type="submit" className="verify-otp-button">
          Verify
        </button>
      </form>
      {message && <p className="verify-otp-message">{message}</p>}
    </div>
  );
};

export default VerifyOtp;
