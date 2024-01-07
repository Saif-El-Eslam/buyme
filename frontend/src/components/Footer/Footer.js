import { useEffect, useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TokenService from "../../Services/AuthAPICalls";
import { logout } from "../../Services/AuthAPICalls";

function Footer() {
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [ourShopOpen, setOurShopOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);

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

  return (
    <div className="footer">
      <div className="logo">
        <Link to="/" className="nav-link">
          <img src="/logo-white.png" alt="logo" />
        </Link>
        <div className="slogan">
          The best to buy
          <br /> All time, any occasion!
        </div>
      </div>

      <div
        className={screenWidth > 850 ? "footer-content" : "footer-closed-list"}
      >
        <div
          className={
            screenWidth > 850 ? "our-shop" : "our-shop footer-closed-list-item"
          }
        >
          <div
            className="title-wrapper"
            onClick={() => setOurShopOpen(!ourShopOpen)}
          >
            <div className="title font-2">Our Shop</div>
            {screenWidth < 850 && (
              <div className="arrow">
                {ourShopOpen ? (
                  <img src="/arrow-down.png" alt="arrow" />
                ) : (
                  <img src="/arrow-right.png" alt="arrow" />
                )}
              </div>
            )}
          </div>
          {(screenWidth > 850 || ourShopOpen) && (
            <div className="content font-3">
              <div
                className="item"
                onClick={() => {
                  navigate("/products/category/T-shirts");
                  window.location.reload();
                }}
              >
                T-shirts
              </div>
              <div
                className="item"
                onClick={() => {
                  navigate("/products/category/shirts");
                  window.location.reload();
                }}
              >
                Shirts
              </div>
              <div
                className="item"
                onClick={() => {
                  navigate("/products/category/pants");
                  window.location.reload();
                }}
              >
                Pants
              </div>
              <div
                className="item"
                onClick={() => {
                  navigate("/products/category/shorts");
                  window.location.reload();
                }}
              >
                Shorts
              </div>
              <div
                className="item"
                onClick={() => {
                  navigate("/products/category/jackets");
                  window.location.reload();
                }}
              >
                Jackets
              </div>
              <div
                className="item"
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

        <div
          className={
            screenWidth > 850 ? "account" : "account footer-closed-list-item"
          }
        >
          <div
            className="title-wrapper"
            onClick={() => setAccountOpen(!accountOpen)}
          >
            <div className="title font-2">Account</div>
            {screenWidth < 850 && (
              <div className="arrow">
                {accountOpen ? (
                  <img src="/arrow-down.png" alt="arrow" />
                ) : (
                  <img src="/arrow-right.png" alt="arrow" />
                )}
              </div>
            )}
          </div>
          {(screenWidth > 850 || accountOpen) && (
            <div className="content font-3">
              <div
                className="item"
                onClick={() =>
                  loggedIn ? navigate("/profile") : navigate("/profile/login")
                }
              >
                My Account
              </div>
              <div
                className="item"
                onClick={() =>
                  loggedIn
                    ? admin
                      ? navigate("/admin/orders")
                      : navigate("/orders")
                    : navigate("/profile/login")
                }
              >
                {admin ? "Orders" : "Orders History"}{" "}
                {!loggedIn && (
                  <span className="login-to-access">login to access</span>
                )}
              </div>
              {!admin && (
                <div className="item" onClick={() => navigate("/cart")}>
                  Cart
                </div>
              )}

              {loggedIn && (
                <div
                  className="item"
                  onClick={() => {
                    logout().then((res) => {
                      if (res.status === 200 || res.status === 401) {
                        TokenService.removeToken();
                        TokenService.removeRole();
                        navigate("/");
                      }
                    });
                  }}
                >
                  Logout
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className={
            screenWidth > 850
              ? "contact-us"
              : "contact-us footer-closed-list-item"
          }
        >
          <div
            className="title-wrapper"
            onClick={() => setContactUsOpen(!contactUsOpen)}
          >
            <div className="title font-2">Contact Us</div>
            {screenWidth < 850 && (
              <div className="arrow">
                {contactUsOpen ? (
                  <img src="/arrow-down.png" alt="arrow" />
                ) : (
                  <img src="/arrow-right.png" alt="arrow" />
                )}
              </div>
            )}
          </div>
          {(screenWidth > 850 || contactUsOpen) && (
            <div className="content font-3">
              <div className="address">
                <div className="icon">
                  <img src="/location-icon.png" alt="location" />
                </div>
                <div className="text">123 Street, City, Country</div>
              </div>
              <div className="phone">
                <div className="icon">
                  <img src="/phone-icon.png" alt="phone" />
                </div>
                <div className="text">+1 234 567 890</div>
              </div>
              <div className="email">
                <div className="icon">
                  <img src="/email-icon.png" alt="email" />
                </div>
                <div className="text">test@buyme.com</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Footer;
