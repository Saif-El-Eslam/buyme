import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const categoriesRef = useRef(null);

  // get the size of the screen
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  useEffect(() => {
    // handle screen size
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Function to handle clicks outside the menu
    const handleClickOutside = (event) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        // Clicked outside the menu, close the menu
        setCategoriesOpen(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="header">
      <Link to="/" className="nav-link">
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
        </div>
      </Link>

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
          <div className="categories" ref={categoriesRef}>
            <div
              className="category"
              onClick={() => navigate("/products/category/t-shirts")}
            >
              T-shirts
            </div>
            <div
              className="category"
              onClick={() => navigate("/products/category/shirts")}
            >
              Shirts
            </div>
            <div
              className="category"
              onClick={() => navigate("/products/category/pants")}
            >
              Pants
            </div>
            <div
              className="category"
              onClick={() => navigate("/products/category/shorts")}
            >
              Shorts
            </div>
            <div
              className="category"
              onClick={() => navigate("/products/category/jackets")}
            >
              Jackets
            </div>
            <div
              className="category"
              onClick={() => navigate("/products/category/hoodies")}
            >
              Hoodies
            </div>
          </div>
        )}
      </div>

      <div className="left-icons">
        <div className="icon">
          <img src="/search.png" alt="search" />
        </div>
        <div
          className="icon"
          onClick={
            () => (false ? navigate("/profile") : navigate("/profile/login")) // check if the user is logged in
          }
        >
          <img src="/profile.png" alt="user" />
        </div>
        <div className="icon" onClick={() => navigate("/cart")}>
          <img src="/shopping-bag.png" alt="cart" />
        </div>
      </div>
    </div>
  );
}

export default Header;
