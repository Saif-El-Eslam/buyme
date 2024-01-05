import axios from "axios";
import TokenService from "./AuthAPICalls";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // Other Axios configuration options
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Unauthorized: Invalid token"
    ) {
      if (TokenService.getToken()) {
        TokenService.removeToken();
        TokenService.removeRole();
        setTimeout(() => {
          window.location.href = "/profile/login";
        }, 2000);
      }
      //  else {
      //   return;
      // }
    }
    return Promise.reject(error);
  }
);

export default api;
