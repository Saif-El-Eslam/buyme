import React, { useState } from "react";
import "./CategoryCard.css";
import { useNavigate } from "react-router-dom";

function CategoryCard({ category, imgURL }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="category-card"
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/products/category/${category}`)}
    >
      <div className="category-card-image">
        <img
          className={hovered ? "category-card-image-hovered" : ""}
          src={imgURL}
          alt="tshirt"
        />
      </div>
      <div className="category-card-title">
        <div className="category-card-title-content font-2"> {category} </div>
        <div className="category-arrow">
          {hovered ? (
            <img
              className="category-arrow-img"
              src="/right-arrow.png"
              alt="arrow"
            />
          ) : (
            <img
              className="category-arrow-img"
              src="/arrow-right-black.png"
              alt="arrow"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
