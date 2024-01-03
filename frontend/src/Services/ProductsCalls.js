import axios from "axios";
import TokenService from "./AuthAPICalls";

export const getProductsByPage = async (pageNum) => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_API_URL}/products/skip/${pageNum - 1}/take/10`
    );
  } catch (error) {
    return error.response.data.message;
  }
};

export const getProductsByPageByCategory = async (pageNum, category) => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_API_URL}/products/category/${category}/skip/${
        pageNum - 1
      }/take/10`
    );
  } catch (error) {
    return error.response.data.message;
  }
};

export const getProductById = async (id) => {
  try {
    return await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
  } catch (error) {
    return error.response.data.message;
  }
};

export const getNProductsPerCategory = async (limit) => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_API_URL}/products/get-n-per-category/${limit}`
    );
  } catch (error) {
    return error.response.data.message;
  }
};

export const createProduct = async (product) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API_URL}/products`,
      product,
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

export const updateProduct = async (id, product) => {
  try {
    return await axios.put(
      `${process.env.REACT_APP_API_URL}/products/${id}`,
      product,
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

export const deleteProduct = async (id) => {
  try {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL}/products/${id}`,
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
