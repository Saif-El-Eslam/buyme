import api from "./Middlewares";
import Cookies from "js-cookie";

export const signup = async (user) => {
  try {
    return await api.post(`/auth/signup`, user);
  } catch (error) {
    return error.response;
  }
};

export const login = async (user) => {
  try {
    return await api.post(`/auth/login`, user);
  } catch (error) {
    return error.response;
  }
};

export const logout = async () => {
  try {
    return await api.post(
      `/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${TokenService.getToken()}`,
        },
      }
    );
  } catch (error) {
    return error.response;
  }
};

export const sendOtp = async (email) => {
  try {
    return await api.post(`/auth/reset-password-otp`, { email });
  } catch (error) {
    return error.response;
  }
};

export const resetPassword = async (otp, email, password, verify_password) => {
  try {
    return await api.post(`/auth/reset-password`, {
      otp,
      email,
      password,
      verify_password,
    });
  } catch (error) {
    return error.response;
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
