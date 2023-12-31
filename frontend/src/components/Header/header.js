import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import TokenService from "../../Services/AuthAPICalls";
import Search from "../Search/Search";

function Header() {
  const urlParts = window.location.href.split("/");

  const navigate = useNavigate();
  const categoriesRef = useRef(null);

  // get the size of the screen
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const loggedIn = TokenService.getToken() ? true : false;
  const admin = TokenService.getRole() === "admin" ? true : false;

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
      {searchOpen && (
        <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      )}

      <Link to={!admin ? "/" : "/admin/products"} className="nav-link">
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
        </div>
      </Link>

      {!admin && (
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
                onClick={() => {
                  navigate("/products/category/T-shirts");
                  window.location.reload();
                }}
              >
                T-shirts
              </div>
              <div
                className="category"
                onClick={() => {
                  navigate("/products/category/shirts");
                  window.location.reload();
                }}
              >
                Shirts
              </div>
              <div
                className="category"
                onClick={() => {
                  navigate("/products/category/pants");
                  window.location.reload();
                }}
              >
                Pants
              </div>
              <div
                className="category"
                onClick={() => {
                  navigate("/products/category/shorts");
                  window.location.reload();
                }}
              >
                Shorts
              </div>
              <div
                className="category"
                onClick={() => {
                  navigate("/products/category/jackets");
                  window.location.reload();
                }}
              >
                Jackets
              </div>
              <div
                className="category"
                onClick={() => {
                  navigate("/products/category/hoodies");
                  window.location.reload();
                }}
              >
                Hoodies
              </div>
            </div>
          )}
        </div>
      )}

      {admin && (
        <div className="products-orders-wrapper">
          {(urlParts.includes("orders") ||
            (!urlParts.includes("products") &&
              !urlParts.includes("orders"))) && (
            <div
              className="products-wrapper"
              onClick={() => navigate("/admin/products")}
            >
              <div className="products-title font-2">All Products</div>
            </div>
          )}

          {(urlParts.includes("products") ||
            (!urlParts.includes("products") &&
              !urlParts.includes("orders"))) && (
            <div
              className="orders-wrapper"
              onClick={() => navigate("/admin/orders")}
            >
              <div className="orders-title font-2">All Orders</div>
            </div>
          )}
        </div>
      )}

      <div className="left-icons">
        <div className="icon" onClick={() => setSearchOpen(true)}>
          <img src="/search.png" alt="search" />
        </div>
        <div
          className="icon"
          onClick={
            () => (loggedIn ? navigate("/profile") : navigate("/profile/login")) // check if the user is logged in
          }
        >
          <img src="/profile.png" alt="user" />
        </div>
        {!admin && (
          <div className="icon" onClick={() => navigate("/cart")}>
            <img src="/shopping-bag.png" alt="cart" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
