import React, { useState } from "react";
import { sendOTPRequest } from "../Authentication/Auth";
import OTPVerify from "./otpverify";
import { useNavigate } from "react-router-dom";

import "./login.css";
const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await sendOTPRequest(phoneNumber);
      setOtpSent(true);
      navigate("/otpverify");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main">
      <div className="container">
        <div className="headings">
          <h1 className="headsignin">Sign In</h1>
          <p className="parasignin">
            Please enter your mobile number to login. We will send an OTP to
            verify your number.
          </p>
        </div>
        {otpSent ? (
          <OTPVerify />
        ) : (
          <div className="btnNum">
            <div className="intrnum">
              <select
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              >
                <option value="">Country Code</option>
                <option value="+91">IND (+91)</option>
                <option value="+1">USA (+1)</option>
                <option value="+44">UK (+44)</option>
              </select>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="inputsignin"
              />
            </div>
            <button onClick={handleSendOtp} className="btnsignin">
              Send OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
