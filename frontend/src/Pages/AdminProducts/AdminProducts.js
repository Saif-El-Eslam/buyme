import "./AdminProducts.css";
import Header from "../../components/Header/header";
import PageNavigation from "../../components/PageNavigation/PageNavigation";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);

  const products = [
    {
      id: 1,
      category: "T-shirt",
      productName: "Cotton T-shirt",
      price: 20,
      imgURL: "http://localhost:3001/categories/t-shirt.jpg",
      quantity: 10,
    },
    {
      id: 2,
      category: "shirt",
      productName: "Green Cotton shirt",
      price: 20,
      imgURL: "http://localhost:3001/categories/shirt.jpg",
      quantity: 0,
    },
    {
      id: 3,
      category: "Shorts",
      productName: "Blue Jeens Cargo Shorts",
      price: 20,
      imgURL: "http://localhost:3001/categories/shorts.jpg",
      quantity: 10,
    },
    {
      id: 4,
      category: "Pants",
      productName: "Olive Cargo Pants",
      price: 20,
      imgURL: "http://localhost:3001/categories/pants.jpg",
      quantity: 10,
    },
    {
      id: 5,
      category: "Jacket",
      productName: "Black Bomber Jacket",
      price: 20,
      imgURL: "http://localhost:3001/categories/jacket.jpg",
      quantity: 10,
    },
    {
      id: 6,
      category: "Hoodie",
      productName: "Green Cotton Hoodie",
      price: 20,
      imgURL: "http://localhost:3001/categories/hoodie.jpg",
      quantity: 5,
    },
  ];

  return (
    <div className="admin-products">
      <Header />
      <div className="admin-products-wrapper">
        <div className="admin-products-header">
          <div className="admin-products-title">All Products</div>
          <div className="admin-products-add-product font-2">+ Add Product</div>
        </div>

        <div className="admin-products-list">
          <div className="admin-products-list-header">
            <div className="admin-products-list-header-img">Image</div>
            <div className="admin-products-list-header-product">Product</div>
            <div className="admin-products-list-header-category">Category</div>
            <div className="admin-products-list-header-price">Price</div>
            <div className="admin-products-list-header-status">Status</div>
            <div className="admin-products-list-header-edit-delete">
              {/* Edit/Delete */} Actions
            </div>
          </div>

          {products.map((product) => {
            return (
              <div
                className="admin-product-card"
                key={product.id}
                onClick={() => {
                  navigate(`/products/update/${product.id}`);
                }}
              >
                <div className="admin-product-img">
                  <img src={product.imgURL} alt={product.productName} />
                </div>

                <div className="admin-product-name font-4">
                  {product.productName}
                </div>
                <div className="admin-product-category">{product.category}</div>
                <div className="admin-product-price">${product.price}</div>
                <div className="admin-product-status">
                  {product.quantity > 0
                    ? `In stock (${product.quantity})`
                    : "out of stock"}
                </div>

                <div className="admin-product-edit-delete-wrapper">
                  <div
                    className="admin-product-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("delete");
                    }}
                  >
                    <img src="http://localhost:3001/delete.png" alt="delete" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="admin-products-navigation-wrapper">
          <PageNavigation
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalPages={10}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
