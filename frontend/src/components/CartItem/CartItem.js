import React, { useState } from "react";
import "./CartItem.css";
import { useNavigate } from "react-router-dom";
import {
  deleteCartItem,
  increaseProductQuantity,
  decreaseProductQuantity,
} from "../../Services/CartAPICalls";
import InfoMessage from "../../components/Messages/InfoMessage";

function CartItem({
  //id, title, image, price
  product: {
    product_id: { title, images, price, _id },
    quantity,
    size,
  },
  setCart,
  refreshCart,
  setRefreshCart,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [infomessage, setInfoMessage] = useState();
  const [infoMessageType, setInfoMessageType] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);

  const handleIncreaseQuantity = () => {
    setLoading(true);
    increaseProductQuantity(_id, size).then((res) => {
      if (res?.status === 200) {
        setCart(res.data);
        setSelectedQuantity(parseInt(selectedQuantity) + 1);
      } else {
        setInfoMessage(res.data.message);
        setInfoMessageType("error");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);
      }
      setLoading(false);
    });
  };

  const handleDecreaseQuantity = () => {
    setLoading(true);
    decreaseProductQuantity(_id, size).then((res) => {
      if (res?.status === 200) {
        setCart(res.data);
        setSelectedQuantity(parseInt(selectedQuantity) - 1);

        if (selectedQuantity === 1) {
          setRefreshCart(!refreshCart);
        }
      } else {
        setInfoMessage(res.data.message);
        setInfoMessageType("error");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);
      }
      setLoading(false);
    });
  };

  const handleDeleteCardItem = () => {
    setLoading(true);
    deleteCartItem(_id, size).then((res) => {
      if (res?.status === 200) {
        setCart(res.data);
        setRefreshCart(!refreshCart);
        setInfoMessage("Product removed from cart");
        setInfoMessageType("info");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);
      } else {
        setInfoMessage(res.data.message);
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
    <div className="cart-item">
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
      <div className="cart-item-wrapper">
        <div
          className="cart-item-image"
          onClick={() => {
            navigate(`/products/${_id}`);
          }}
        >
          <img src={images ? images[0] : ""} alt={title} />
        </div>

        <div className="cart-item-details-quantity-price-wrapper">
          <div className="cart-item-details">
            <div
              className="cart-item-title font-4"
              onClick={() => {
                navigate(`/products/${_id}`);
              }}
            >
              {title}
            </div>
            <div className="cart-item-price font-3">${price}</div>
            <div className="cart-item-size font-3">Size: {size}</div>
          </div>

          <div className="cart-item-quantity-price-wrapper">
            <div className="cart-item-quantity">
              <div className="cart-item-quantity-title font-3">Quantity</div>
              <div className="cart-item-quantity-wrapper">
                <div
                  className="cart-item-quantity-minus font-3"
                  onClick={() => handleDecreaseQuantity()}
                >
                  -
                </div>
                <div className="cart-item-quantity-number">
                  {selectedQuantity}
                </div>
                <div
                  className="cart-item-quantity-plus font-3"
                  onClick={() => handleIncreaseQuantity()}
                >
                  +
                </div>
              </div>
            </div>

            <div className="cart-item-total-price-wrapper font-3">
              <div className="cart-item-total-price-title">Total</div>
              <div className="cart-item-total-price">
                ${price * selectedQuantity}
              </div>
            </div>
          </div>
        </div>

        <div className="cart-item-remove">
          <div
            className="cart-item-remove-button font-3"
            onClick={() => handleDeleteCardItem()}
          >
            <img src="/delete.png" alt="trash" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
