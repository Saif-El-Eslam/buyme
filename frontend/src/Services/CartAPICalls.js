import api from "./Middlewares";
import TokenService from "./AuthAPICalls";

export const addToCart = async (productId, quantity, size) => {
  try {
    return await api.put(
      `/cart/add-product`,
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
    return error.response;
  }
};

export const getCart = async () => {
  try {
    return await api.get(`/cart`, {
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
    return await api.put(
      `/cart/remove-product`,
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
    return await api.put(
      `/cart/increase-product-quantity`,
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
    return await api.put(
      `/cart/decrease-product-quantity`,
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
