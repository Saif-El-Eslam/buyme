import "./AdminAddProduct.css";
import Header from "../../components/Header/header";
import React, { useState } from "react";
import ProductForm from "../../components/ProductForm/ProductForm";
import { useNavigate } from "react-router-dom";
import InfoMessage from "../../components/Messages/InfoMessage";
import { createProduct } from "../../Services/ProductsCalls";

function AdminAddProduct() {
  const navigate = useNavigate();
  const [infomessage, setInfoMessage] = useState();
  const [infoMessageType, setInfoMessageType] = useState();
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    title: "",
    price: 0,
    category: "",
    description: "",
    images: [],
    quantity: 0,
    sizes: [
      { size: "S", quantity: 0 },
      { size: "M", quantity: 0 },
      { size: "L", quantity: 0 },
      { size: "XL", quantity: 0 },
      { size: "XXL", quantity: 0 },
    ],
  });

  const OnAddProduct = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("description", product.description);
    formData.append("quantity", product.quantity);
    formData.append("sizes", JSON.stringify(product.sizes));
    product.images.forEach((image) => {
      formData.append(`file`, image);
    });

    createProduct(formData).then((res) => {
      if (res.status === 201) {
        setInfoMessage(res.data.message);
        setInfoMessageType("info");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
          // navigate("/admin/products");
        }, 3000);
      } else {
        setInfoMessage(res.data.message);
        setInfoMessageType("error");

        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);
      }
      setLoading(false);
    });
  };

  return (
    <div className="admin-add-product">
      <Header />

      <div className="admin-add-product-wrapper">
        {infomessage && (
          <InfoMessage
            message={infomessage}
            setMessage={setInfoMessage}
            type={infoMessageType}
          />
        )}

        {loading && (
          <div className="loader-wrapper">
            <div className="loader"></div>
          </div>
        )}

        <div className="admin-add-product-products-link-wrapper">
          <div
            className="admin-add-product-products-link"
            onClick={() => navigate("/admin/products")}
          >
            /products
          </div>
        </div>

        <div className="admin-add-product-header">
          <div className="admin-add-product-title">Add Product</div>
        </div>

        <div className="admin-add-product-form-wrapper">
          <ProductForm
            product={product}
            setProduct={setProduct}
            onAction={OnAddProduct}
            isCreateProduct={true}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminAddProduct;
