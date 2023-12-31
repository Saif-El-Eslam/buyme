import axios from "axios";

export const uploadImage = async (productId, formData) => {
  try {
    const response = await axios.put(
      `http://127.0.0.1:5000/api/products/${productId}/add-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU4NDc2N2NiYzk1MTdjM2I5MzdiMzFmIiwiZW1haWwiOiJhZG1pbkB0ZXN0LmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNDAzNjMzNSwiZXhwIjoxNzA0MDc5NTM1fQ.h5peINyoNASdwEO5u79wjKdCCmoW6KLpOyhxY9HdwuA`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
