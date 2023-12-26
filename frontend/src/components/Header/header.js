import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const categoriesRef = useRef(null);

  // get the size of the screen
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  // update the size of the screen when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]); // eslint-disable-line react-hooks/exhaustive-deps

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
