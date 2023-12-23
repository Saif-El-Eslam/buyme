import React, { useEffect, useState } from "react";
import "./Header.css";

function Header() {
  // get the size of the screen
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="header">
      <div className="logo">
        <img src="/logo.svg" alt="logo" />
      </div>

      <div className="categories-wrapper">
        {screenWidth < 850 && (
          <div
            className="title-wrapper"
            onClick={() => setCategoriesOpen(!categoriesOpen)}
          >
            <div className="category-title font-2">categories</div>

            <div className="arrow">
              {categoriesOpen ? (
                <img src="/arrow-down-black.png" alt="arrow" />
              ) : (
                <img src="/arrow-right-black.png" alt="arrow" />
              )}
            </div>
          </div>
        )}
        {(screenWidth > 850 || categoriesOpen) && (
          <div className="categories">
            <div className="category">T-shirts</div>
            <div className="category">Shirts</div>
            <div className="category">Pants</div>
            <div className="category">Shorts</div>
            <div className="category">Jackets</div>
            <div className="category">Hoodies</div>
          </div>
        )}
      </div>

      <div className="left-icons">
        <div className="icon">
          <img src="/search.png" alt="search" />
        </div>
        <div className="icon">
          <img src="/profile.png" alt="user" />
        </div>
        <div className="icon">
          <img src="/shopping-bag.png" alt="cart" />
        </div>
      </div>
    </div>
  );
}

export default Header;
