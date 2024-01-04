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

export const getCart = async () => {
  try {
    return await axios.get(`${process.env.REACT_APP_API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${TokenService.getToken()}`,
      },
    });
  } catch (error) {
    return error.response;
  }
};

export const deleteCartItem = async (productId, size) => {
  try {
    return await axios.put(
      `${process.env.REACT_APP_API_URL}/cart/remove-product`,
      {
        product_id: productId,
        size,
      },
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

export const increaseProductQuantity = async (productId, size) => {
  try {
    return await axios.put(
      `${process.env.REACT_APP_API_URL}/cart/increase-product-quantity`,
      {
        product_id: productId,
        size,
      },
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

export const decreaseProductQuantity = async (productId, size) => {
  try {
    return await axios.put(
      `${process.env.REACT_APP_API_URL}/cart/decrease-product-quantity`,
      {
        product_id: productId,
        size,
      },
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
