import "./AdminEditProduct.css";
import Header from "../../components/Header/header";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../../components/ProductForm/ProductForm";
import { useNavigate } from "react-router-dom";

function AdminEditProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    id: useParams().id,
    title: "Nike Slim Shirt",
    price: 120,
    category: "Shirts",
    description: "high quality product",
    images: ["http://localhost:3001/close.png"],
    quantity: 10,
    sizes: [
      { size: "S", quantity: 5 },
      { size: "M", quantity: 5 },
      { size: "L", quantity: 5 },
      { size: "XL", quantity: 5 },
      { size: "XXL", quantity: 5 },
    ],
  });

  return (
    <div className="admin-edit-product">
      <Header />

      <div className="admin-edit-product-wrapper">
        <div className="admin-edit-product-products-link-wrapper">
          <div
            className="admin-edit-product-products-link"
            onClick={() => navigate("/admin/products")}
          >
            /products
          </div>
        </div>

        <div className="admin-edit-product-header">
          <div className="admin-edit-product-title">Update Product</div>
        </div>

        <div className="admin-edit-product-form-wrapper">
          <ProductForm product={product} setProduct={setProduct} />
        </div>
      </div>
    </div>
  );
}

export default AdminEditProduct;
