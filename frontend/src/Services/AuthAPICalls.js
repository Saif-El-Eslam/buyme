import axios from "axios";
import Cookies from "js-cookie";

export const signup = async (user) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/signup`,
      user
    );
  } catch (error) {
    return error.response.data.message;
  }
};

export const login = async (user) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      user
    );
  } catch (error) {
    return error.response.data.message;
  }
};

//////////////////////////////////////////////
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const TokenService = {
  setToken: (token) => {
    Cookies.set(TOKEN_KEY, token);
  },

  setRole: (role) => {
    Cookies.set("role", role);
  },

  getToken: () => {
    return Cookies.get(TOKEN_KEY);
  },

  getRole: () => {
    return Cookies.get("role");
  },

  removeToken: () => {
    Cookies.remove(TOKEN_KEY);
  },

  removeRole: () => {
    Cookies.remove("role");
  },
};

export default TokenService;
