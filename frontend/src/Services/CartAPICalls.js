import axios from "axios";
import TokenService from "./AuthAPICalls";

export const addToCart = async (productId, quantity, size) => {
  try {
    console.log(productId, quantity, size);
    return await axios.put(
      `${process.env.REACT_APP_API_URL}/cart/add-product`,
      {
        product_id: productId,
        quantity,
        size,
      },
      {
        headers: {
          Authorization: `Bearer ${TokenService.getToken()}`,
        },
      }
    );
  } catch (error) {
    return error.response.data.message;
  }
};
