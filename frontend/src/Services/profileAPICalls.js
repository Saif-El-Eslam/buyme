import TokenService from "./AuthAPICalls";
import api from "./Middlewares";

export const getProfile = async () => {
  try {
    return await api.get(`/profile`, {
      headers: { Authorization: `Bearer ${TokenService.getToken()}` },
    });
  } catch (error) {
    return error.response;
  }
};

export const updateProfile = async (profile) => {
  try {
    return await api.put(`/profile`, profile, {
      headers: { Authorization: `Bearer ${TokenService.getToken()}` },
    });
  } catch (error) {
    return error.response;
  }
};

export const changePassword = async (passwords) => {
  try {
    return await api.put(`/profile/password`, passwords, {
      headers: { Authorization: `Bearer ${TokenService.getToken()}` },
    });
  } catch (error) {
    return error.response;
  }
};
