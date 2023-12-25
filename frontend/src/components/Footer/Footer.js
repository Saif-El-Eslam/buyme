import { useEffect, useState } from "react";
import "./Footer.css";

function Footer() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [ourShopOpen, setOurShopOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);

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
    <div className="footer">
      <div className="logo">
        <img src="/logo-white.png" alt="logo" />
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
              <div className="item">T-shirts</div>
              <div className="item">Shirts</div>
              <div className="item">Pants</div>
              <div className="item">Shorts</div>
              <div className="item">Jackets</div>
              <div className="item">Hoodies</div>
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
              <div className="item">My Account</div>
              <div className="item">
                Orders History{" "}
                <span className="login-to-access">login to access</span>
              </div>
              <div className="item">Cart</div>
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