import "./AdminEditProduct.css";
import Header from "../../components/Header/header";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../../components/ProductForm/ProductForm";
import { useNavigate } from "react-router-dom";
import InfoMessage from "../../components/Messages/InfoMessage";
import { getProductById, updateProduct } from "../../Services/ProductsCalls";

function AdminEditProduct() {
  const navigate = useNavigate();
  const productId = useParams().id;
  const [infomessage, setInfoMessage] = useState();
  const [infoMessageType, setInfoMessageType] = useState();
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState();

  useEffect(() => {
    setLoading(true);
    getProductById(productId).then((res) => {
      console.log(res);
      setProduct(res.data);
      setLoading(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onEditProduct = () => {
    setLoading(true);
    updateProduct(product._id, {
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      sizes: product.sizes,
    }).then((res) => {
      if (res.status === 200) {
        setInfoMessage(res.data.message);
        setInfoMessageType("info");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);
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
    <div className="admin-edit-product">
      <Header />

      <div className="admin-edit-product-wrapper">
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
          {product && (
            <ProductForm
              product={product}
              setProduct={setProduct}
              isCreateProduct={false}
              onAction={onEditProduct}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminEditProduct;
