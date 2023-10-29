import React, { useState } from "react";
import { sendOTPRequest } from "../Authentication/Auth";
import OTPVerify from "./otpverify";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./login.css";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const formatPhoneNumber = (phoneNumber) => {
    const numericPhoneNumber = phoneNumber.replace(/\D/g, "");

    return `+${numericPhoneNumber}`;
  };

  const handleSendOtp = async () => {
    try {
      // Format the phone number
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      console.log("Formatted Phone Number: ", formattedPhoneNumber);

      await sendOTPRequest(formattedPhoneNumber);
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
              <PhoneInput
                country={"in"}
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)}
                inputProps={{ required: true }}
                // className="inputsignin"
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
