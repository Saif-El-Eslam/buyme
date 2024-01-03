import React, { useState } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

function ProductCard({
  // product: { category, productName, price, imgURL, id },
  product: { category, title, price, images, _id },
}) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  // console.log(hovered);
  return (
    <div
      className="product-card"
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="product-card-image">
        <img src={images[0]} alt={`product->${category}`} />

        {hovered && (
          <div className="product-card-image-buttons">
            <div className="button-wrapper font-5">
              <div className="button-border-green-product-card">
                Add To Card
              </div>
            </div>

            <div
              className="button-wrapper font-5"
              onClick={() => navigate(`/products/${_id}`)}
            >
              <div className="button-border-green-product-card">View</div>
            </div>
          </div>
        )}
      </div>
      <div className="product-card-text">
        <div className="product-card-left-content font-3">
          <div className="product-card-left-content-category"> {category} </div>
          <div className="product-card-left-content-product-name font-4">
            {title}
          </div>
        </div>
        <div className="product-card-right-content font-3"> ${price} </div>
      </div>
    </div>
  );
}

export default ProductCard;
