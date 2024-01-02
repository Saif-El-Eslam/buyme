import "./AdminProducts.css";
import Header from "../../components/Header/header";
import PageNavigation from "../../components/PageNavigation/PageNavigation";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsByPage, deleteProduct } from "../../Services/ProductsCalls";
import InfoMessage from "../../components/Messages/InfoMessage";

function AdminProducts() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [infomessage, setInfoMessage] = useState();
  const [infoMessageType, setInfoMessageType] = useState();
  const [deletFlag, setDeleteFlag] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProductsByPage(pageNumber).then((res) => {
      setProducts(res.data?.products);
      setTotalPages(res.data?.pagesCount);
      if (res.data?.pagesCount < pageNumber) {
        setPageNumber(res.data.pagesCount);
      }
      setLoading(false);
    });
  }, [pageNumber, deletFlag]); // eslint-disable-line react-hooks/exhaustive-deps

  const onDeleteProduct = (id) => {
    setLoading(true);
    deleteProduct(id).then((res) => {
      if (res.status === 200) {
        setInfoMessage(res.data.message);
        setInfoMessageType("info");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);

        setDeleteFlag(!deletFlag);
      } else {
        setInfoMessage(res);
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
    <div className="admin-products">
      <Header />
      <div className="admin-products-wrapper">
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

        <div className="admin-products-header">
          <div className="admin-products-title">All Products</div>
          <div
            className="admin-products-add-product font-2"
            onClick={() => navigate("/admin/products/add")}
          >
            + Add Product
          </div>
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

          {products?.map((product) => {
            return (
              <div
                className="admin-product-card"
                key={product._id}
                onClick={() => {
                  navigate(`/admin/products/${product.id}/update`);
                }}
              >
                <div className="admin-product-img">
                  <img src={product.images[0]} alt={product.title} />
                </div>

                <div className="admin-product-name font-4">{product.title}</div>
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
                      onDeleteProduct(product._id);
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
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
