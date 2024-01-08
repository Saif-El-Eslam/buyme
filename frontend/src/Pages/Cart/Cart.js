import React, { useEffect, useState } from "react";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import CartItem from "../../components/CartItem/CartItem";
import "./Cart.css";
import { getCart } from "../../Services/CartAPICalls";
import InfoMessage from "../../components/Messages/InfoMessage";
import TokenService from "../../Services/AuthAPICalls";
import { useNavigate } from "react-router";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(false);
  const [infomessage, setInfoMessage] = useState();
  const [infoMessageType, setInfoMessageType] = useState();
  const [refreshCart, setRefreshCart] = useState(false);

  useEffect(() => {
    setCart({});
    setLoading(true);
    getCart().then((res) => {
      if (res?.status === 200) {
        setCart(res.data);
      } else {
        setInfoMessage(res?.data?.message);
        setInfoMessageType("error");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);
      }
      setLoading(false);
    });
  }, [refreshCart]);

  return (
    <div className="carts-page">
      <Header />

      <div className="carts-page-content">
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

        <div className="carts-page-title">
          <h1>Your Cart</h1>
        </div>

        {(!cart || !cart?.products?.length) && (
          <div className="carts-page-empty">
            {TokenService.getToken() ? (
              <div className="cart-empty">
                <h2 className="carts-page-empty-header">Your cart is empty</h2>
                <p className="carts-page-empty-text">
                  Looks like you haven't added anything to your cart yet
                </p>

                <div
                  className="button-wrapper"
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  <div className="button-green">Continue Shopping</div>
                </div>
              </div>
            ) : (
              <div className="cart-empty">
                <h2 className="carts-page-empty-header">
                  You're not logged in
                </h2>
                <p className="carts-page-empty-text">
                  Please login to view your cart
                </p>

                <div
                  className="button-wrapper"
                  onClick={() => {
                    navigate("/profile/login");
                  }}
                >
                  <div className="button-green">Login</div>
                </div>
              </div>
            )}
          </div>
        )}

        {cart && cart?.products?.length > 0 && (
          <div className="carts-page-list">
            <div className="cart-items-wrapper">
              {cart.products.map((product, i) => (
                <div className="cart-item-container" key={i}>
                  <CartItem
                    product={product}
                    setCart={setCart}
                    setRefreshCart={setRefreshCart}
                    refreshCart={refreshCart}
                  />
                </div>
              ))}
            </div>

            <div className="cart-total-submit-wrapper">
              <div className="cart-total-wrapper">
                <div className="cart-total-title font-2">Total Price:</div>
                <div className="cart-total-price">${cart.total_price}</div>
              </div>

              <div className="cart-checkout">
                <div
                  className="checkout-return-to-cart-link"
                  onClick={() => navigate("/products")}
                >
                  <img
                    src="/arrow-left-black.png"
                    alt=""
                    className="checkout-left-arrow"
                  />
                  Continue Shopping
                </div>
                <div
                  className="cart-submit-wrapper button-wrapper"
                  onClick={() => {
                    navigate("/checkout");
                  }}
                >
                  <div className="button-green">Checkout</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
