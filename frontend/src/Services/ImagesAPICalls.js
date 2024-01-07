import api from "./Middlewares";
import TokenService from "./AuthAPICalls";

export const uploadImage = async (productId, formData) => {
  try {
    const response = await api.put(
      `/products/${productId}/add-image`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${TokenService.getToken()}`,
        },
      }
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteImage = async (productId, images) => {
  try {
    const response = await api.put(
      `/products/${productId}/remove-image`,
      { images },
      {
        headers: {
          Authorization: `Bearer ${TokenService.getToken()}`,
        },
      }
    );

    return response;
  } catch (error) {
    return error.response;
  }
};
