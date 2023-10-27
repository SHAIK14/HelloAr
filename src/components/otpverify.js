import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./otpverify.css";
const OTPVerify = () => {
  const [otp, setOTP] = useState(["", "", "", ""]);
  const otpInputRefs = [];
  const [isVerified, setIsVerified] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCounter, setResendCounter] = useState(0);
  const navigate = useNavigate();
  const handleOTPPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const otpArray = pastedData.split("").slice(0, 4);
    const updatedOTP = [...otp];
    otpArray.forEach((digit, index) => {
      updatedOTP[index] = digit;
    });
    setOTP(updatedOTP);
  };
  const handleOTPChange = (e, index) => {
    const value = e.target.value;

    if (value.length <= 1) {
      const updatedOTP = [...otp];
      updatedOTP[index] = value;
      setOTP(updatedOTP);

      if (index < otpInputRefs.length - 1) {
        otpInputRefs[index + 1].focus();
      }
    }
  };
  // const handleOTPChange = (e, index) => {
  //   const value = e.target.value;

  //   if (!isNaN(value) && value !== "") {
  //     const updatedOTP = [...otp];
  //     updatedOTP[index] = value;
  //     setOTP(updatedOTP);

  //     if (index < otpInputRefs.length - 1) {
  //       otpInputRefs[index + 1].focus();
  //     }
  //   }
  // };

  const handleVerifyOTP = () => {
    const isOTPVerified = otp.join("") === "5678";

    if (isOTPVerified) {
      setIsVerified(true);
      navigate("/music");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleResendOTP = () => {
    setIsResending(true);
    setResendCounter(resendCounter + 1);

    setTimeout(() => {
      setIsResending(false);
      alert("OTP Resent");
    }, 2000);
  };

  return (
    <div className="containerotp">
      <div className="headingsotp">
        <h1 className="headotp">OTP verification</h1>
        <p className="paraotp">
          We have sent OTP. Please enter the code received to verify.
        </p>
      </div>
      <div className="otp-container">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            className="otp-input"
            value={digit}
            onChange={(e) => handleOTPChange(e, index)}
            onPaste={handleOTPPaste}
            ref={(input) => (otpInputRefs[index] = input)}
            maxLength="1"
          />
        ))}
      </div>
      <div className="otpbtns">
        <button onClick={handleVerifyOTP} className="verifybtn">
          Verify OTP
        </button>
        {isResending ? (
          <p>Resending OTP...</p>
        ) : (
          <button onClick={handleResendOTP} className="verifybtn">
            Resend OTP
          </button>
        )}
        {isVerified && <p>OTP Verified! You can proceed.</p>}
      </div>
    </div>
  );
};

export default OTPVerify;
