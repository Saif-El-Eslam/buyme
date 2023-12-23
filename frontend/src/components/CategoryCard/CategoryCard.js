import React, { useState } from "react";
import "./CategoryCard.css";

function CategoryCard({ category, imgURL }) {
  const [hovered, setHovered] = useState(false);
  console.log(hovered);
  return (
    <div
      className="category-card"
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="category-card-image">
        <img
          className={hovered && "category-card-image-hovered"}
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
              src="http://localhost:3001/right-arrow.png"
              alt="arrow"
            />
          ) : (
            <img
              className="category-arrow-img"
              src="http://localhost:3001/arrow-right-black.png"
              alt="arrow"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
