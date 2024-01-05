import api from "./Middlewares";
import TokenService from "./AuthAPICalls";

export const getProductsByPage = async (pageNum, sortFields, sizes) => {
  try {
    return await api.get(
      `/products/skip/${pageNum > 0 ? pageNum - 1 : 0}/take/10/${
        sortFields.sortField
      }/${sortFields.sortDirection}/${sizes}`
    );
  } catch (error) {
    return error.response;
  }
};

export const getProductsByPageByCategory = async (
  pageNum,
  category,
  sortFields,
  sizes
) => {
  try {
    return await api.get(
      `/products/category/${category}/skip/${
        pageNum > 0 ? pageNum - 1 : 0
      }/take/10/${sortFields.sortField}/${sortFields.sortDirection}/${sizes}`
    );
  } catch (error) {
    return error.response;
  }
};

export const getProductById = async (id) => {
  try {
    return await api.get(`/products/${id}`);
  } catch (error) {
    return error.response;
  }
};

export const getNProductsPerCategory = async (limit) => {
  try {
    return await api.get(`/products/get-n-per-category/${limit}`);
  } catch (error) {
    return error.response;
  }
};

export const createProduct = async (product) => {
  try {
    return await api.post(`/products`, product, {
      headers: {
        Authorization: `Bearer ${TokenService.getToken()}`,
      },
    });
  } catch (error) {
    return error.response;
  }
};

export const updateProduct = async (id, product) => {
  try {
    return await api.put(`/products/${id}`, product, {
      headers: {
        Authorization: `Bearer ${TokenService.getToken()}`,
      },
    });
  } catch (error) {
    return error.response;
  }
};

export const deleteProduct = async (id) => {
  try {
    return await api.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${TokenService.getToken()}`,
      },
    });
  } catch (error) {
    return error.response;
  }
};
