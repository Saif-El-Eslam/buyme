import "./AdminAddProduct.css";
import Header from "../../components/Header/header";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../../components/ProductForm/ProductForm";
import { useNavigate } from "react-router-dom";

function AdminAddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    id: useParams().id,
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

  return (
    <div className="admin-add-product">
      <Header />

      <div className="admin-add-product-wrapper">
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
          <ProductForm product={product} setProduct={setProduct} />
        </div>
      </div>
    </div>
  );
}

export default AdminAddProduct;
