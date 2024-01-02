import axios from "axios";

export const getProfile = async (token) => {
  try {
    return await axios.get(`${process.env.REACT_APP_API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    return error.response.data.message;
  }
};
