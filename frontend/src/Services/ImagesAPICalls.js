import axios from "axios";
import TokenService from "./AuthAPICalls";

export const uploadImage = async (productId, formData) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/products/${productId}/add-image`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${TokenService.getToken()}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async (productId, images) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/products/${productId}/remove-image`,
      { images },
      {
        headers: {
          Authorization: `Bearer ${TokenService.getToken()}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
