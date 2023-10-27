import axios from "axios";

const API_ENDPOINT = "https://dev.api.goongoonalo.com/v1";

const sendOTPRequest = async (phoneNumber) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/auth/login`, {
      phoneNumber,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to send OTP request");
    }
  } catch (error) {
    throw error;
  }
};

export { sendOTPRequest };
