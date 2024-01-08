import "./Checkout.css";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../Services/profileAPICalls";
import { getCart } from "../../Services/CartAPICalls";
import { createOrder } from "../../Services/OrderAPICalls";
import InfoMessage from "../../components/Messages/InfoMessage";

function OrderOverview() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});
  const [cart, setCart] = useState({});
  const [newAddressSelected, setNewAddressSelected] = useState(false);
  const [newAddress, setNewAddress] = useState({
    country: "",
    governorate: "",
    city: "",
    street: "",
    notes: "",
  });

  const [infomessage, setInfoMessage] = useState();
  const [infoMessageType, setInfoMessageType] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getCart().then((res) => {
      if (res?.status === 200) {
        setCart(res.data);

        if (res.data.products.length === 0) {
          setInfoMessage("Your cart is empty");
          setInfoMessageType("error");
          setTimeout(() => {
            setInfoMessage("");
            setInfoMessageType("");
            navigate("/cart");
          }, 2000);
        }
      } else {
        setInfoMessage(res?.data?.message);
        setInfoMessageType("error");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);

        setLoading(false);
      }
    });

    getProfile().then((res) => {
      if (res.status === 200) {
        setProfile(res.data);
      } else {
        setInfoMessage(res?.data.message);

        setInfoMessageType("error");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);
      }

      setLoading(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const placeOrder = () => {
    setLoading(true);

    const products = cart.products.map((product) => {
      return {
        product_id: product.product_id._id,
        quantity: product.quantity,
        size: product.size,
      };
    });

    const order = {
      products: products,
      delivery_address: newAddressSelected ? newAddress : profile.address,
      payment_method: profile.payment_method,
      cart_id: cart._id,
    };

    createOrder(order).then((res) => {
      if (res?.status === 201) {
        setInfoMessage(res?.data.message);
        setInfoMessageType("info");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
          navigate("/orders");
        }, 3000);
      } else {
        setInfoMessage(res?.data.message);
        setInfoMessageType("error");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);
      }

      setLoading(false);
    });
  };

  return (
    <div className="checkout">
      <Header />
      <div className="checkout-content">
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

        <div className="checkout-header">
          <div className="checkout-title font-5">Checkout</div>
        </div>

        <div className="checkout-content-details">
          {cart?.products?.length !== 0 && (
            <div className="order-overview">
              <div className="order-overview-title font-3">Overview</div>

              <div className="order-overview-content">
                <div className="order-overview-content-products">
                  {cart?.products?.map((product, i) => {
                    return (
                      <div className="order-overview-content-product" key={i}>
                        <div className="order-overview-content-product-image">
                          <img src={product?.product_id?.images[0]} alt="" />

                          <div className="order-overview-content-product-quantity font-5">
                            {product?.quantity}
                          </div>
                        </div>

                        <div className="order-overview-content-product-details">
                          <div className="order-overview-content-product-name-size">
                            <div className="order-overview-content-product-name font-4">
                              {product?.product_id?.title}
                            </div>

                            <div className="order-overview-content-product-size font-5">
                              {product?.size}
                            </div>
                          </div>

                          <div className="order-overview-content-product-price font-5">
                            ${product?.product_id?.price * product?.quantity}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="order-overview-content-price">
                  <div className="order-overview-content-sub font-5">
                    <div className="order-overview-content-subtotal">
                      <div className="order-overview-content-subtotal-text">
                        Subtotal
                      </div>
                      <div className="order-overview-content-subtotal-price">
                        ${cart?.total_price}
                      </div>
                    </div>
                    <div className="order-overview-content-shipping">
                      <div className="order-overview-content-shipping-text">
                        Shipping
                      </div>
                      <div className="order-overview-content-shipping-price">
                        Free
                      </div>
                    </div>
                  </div>

                  <div className="order-overview-content-total font-5">
                    <div className="order-overview-content-total-text">
                      Total
                    </div>

                    <div className="order-overview-content-total-price">
                      ${cart?.total_price}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="delivery-address-overview">
            <div className="delivery-address-overview-title font-3">
              Address
            </div>

            <div className="delivery-address-overview-content">
              {profile?.address && (
                <div className="delivery-address-selection-wrapper">
                  <div
                    className="delivery-address-selection-saved"
                    onClick={() => setNewAddressSelected(false)}
                  >
                    <div className="selector-circle">
                      {profile?.address && !newAddressSelected && (
                        <div className="selector-circle-selected"></div>
                      )}
                    </div>

                    <div className="delivery-address-selection-text font-5">
                      {profile?.address?.street},{" "}
                      {profile?.address?.governorate}, {profile?.address?.city},{" "}
                      {profile?.address?.country}{" "}
                    </div>
                  </div>
                </div>
              )}

              <div className="delivery-address-selection-wrapper">
                <div
                  className="delivery-address-selection-new"
                  onClick={() => setNewAddressSelected(true)}
                >
                  <div className="selector-circle">
                    {newAddressSelected && (
                      <div className="selector-circle-selected"></div>
                    )}
                  </div>

                  <div className="delivery-address-selection-text font-5">
                    Other Address
                  </div>
                </div>

                {newAddressSelected && (
                  <div className="delivery-address-selection-new-form">
                    <div className="delivery-address-country-governorate-city">
                      <div className="delivery-address-country">
                        <div className="delivery-address-sub-title font-5">
                          Country
                        </div>

                        <div className="delivery-address-selection-new-field-wrapper">
                          <input
                            type="text"
                            placeholder="Country"
                            value={newAddress?.country}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                country: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="delivery-address-governorate">
                        <div className="delivery-address-sub-title font-5">
                          Governorate
                        </div>

                        <div className="delivery-address-selection-new-field-wrapper">
                          <input
                            type="text"
                            placeholder="Governorate"
                            value={newAddress.governorate}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                governorate: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="delivery-address-city">
                        <div className="delivery-address-sub-title font-5">
                          City
                        </div>

                        <div className="delivery-address-selection-new-field-wrapper">
                          <input
                            type="text"
                            placeholder="City"
                            value={newAddress.city}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                city: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="delivery-address-street">
                      <div className="delivery-address-sub-title font-5">
                        Street
                      </div>

                      <div className="delivery-address-selection-new-field-wrapper">
                        <input
                          type="text"
                          placeholder="Street"
                          value={newAddress.street}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              street: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="delivery-address-notes">
                      <div className="delivery-address-sub-title font-5">
                        Notes
                      </div>

                      <div className="delivery-address-selection-new-field-wrapper">
                        <input
                          type="text"
                          placeholder="Notes"
                          value={newAddress.notes}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              notes: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="payment-method-overview">
            <div className="payment-method-overview-title font-3">Payment</div>

            <div className="payment-method-overview-content">
              <div className="payment-method-type-wrapper">
                <div className="payment-method-type-cash">
                  <div className="selector-circle">
                    {profile?.payment_method?.payment_type === "cash" && (
                      <div className="selector-circle-selected"></div>
                    )}
                  </div>

                  <div className="payment-method-type-cash-text font-5">
                    Cash
                  </div>
                </div>
              </div>

              <div className="payment-method-type-wrapper">
                <div className="payment-method-type-card">
                  <div className="selector-circle">
                    {profile?.payment_method?.payment_type === "card" && (
                      <div className="selector-circle-selected"></div>
                    )}
                  </div>

                  <div className="payment-method-type-card-text font-5">
                    Card{" "}
                    <span className="payment-method-type-card-text-sub">
                      (Coming Soon)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-submit">
          <div
            className="checkout-return-to-cart-link"
            onClick={() => navigate("/cart")}
          >
            <img
              src="/arrow-left-black.png"
              alt=""
              className="checkout-left-arrow"
            />
            Return to cart
          </div>

          <div
            className="checkout-button-wrapper button-wrapper"
            onClick={placeOrder}
          >
            <div className="button-green">Place Order</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default OrderOverview;
