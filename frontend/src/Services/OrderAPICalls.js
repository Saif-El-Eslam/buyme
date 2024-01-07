import api from "./Middlewares";
import TokenService from "./AuthAPICalls";

export const createOrder = async (order) => {
  try {
    return await api.post(`/orders`, order, {
      headers: {
        Authorization: `Bearer ${TokenService.getToken()}`,
      },
    });
  } catch (error) {
    return error.response;
  }
};

export const getOrdersByStatus = async (status) => {
  try {
    return await api.get(`/orders/status/${status}`, {
      headers: {
        Authorization: `Bearer ${TokenService.getToken()}`,
      },
    });
  } catch (error) {
    return error.response;
  }
};

export const getOrders = async (pageNum) => {
  try {
    return await api.get(
      `/orders/skip/${pageNum > 0 ? pageNum - 1 : 0}/take/10`,
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

export const getOrderById = async (id) => {
  try {
    return await api.get(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${TokenService.getToken()}`,
      },
    });
  } catch (error) {
    return error.response;
  }
};

export const getOrdersInLastNDays = async (n) => {
  try {
    return await api.get(`/orders/days/${n}`, {
      headers: {
        Authorization: `Bearer ${TokenService.getToken()}`,
      },
    });
  } catch (error) {
    return error.response;
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    return await api.put(
      `/orders/${id}/status`,
      { status },
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

export const deleteOrder = async (id) => {
  try {
    return await api.delete(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${TokenService.getToken()}`,
      },
    });
  } catch (error) {
    return error.response;
  }
};
