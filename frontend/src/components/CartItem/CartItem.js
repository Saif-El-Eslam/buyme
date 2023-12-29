import React, { useState } from "react";
import "./CartItem.css";
import { useNavigate } from "react-router-dom";

function CartItem({
  product: { id, title, image, price, quantity, size },
  maxQuantity,
  setCart,
}) {
  const navigate = useNavigate();
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);

  const handleQuantityChange = (e) => {
    //   allow empty string
    if (e.target.value === "") {
      setSelectedQuantity(0);
      setCart((prevCart) => {
        const newCart = { ...prevCart };
        newCart.products = newCart.products.map((product) => {
          if (product.id === id) {
            product.quantity = e.target.value;
          }
          return product;
        });
        return newCart;
      });
    } // the value is a number
    else if (e.target.value > 0 && e.target.value <= maxQuantity) {
      setSelectedQuantity(e.target.value);
      setCart((prevCart) => {
        const newCart = { ...prevCart };
        newCart.products = newCart.products.map((product) => {
          if (product.id === id) {
            product.quantity = e.target.value;
          }
          return product;
        });
        return newCart;
      });
    }
  };
  return (
    <div className="cart-item">
      <div className="cart-item-wrapper">
        <div
          className="cart-item-image"
          onClick={() => {
            navigate(`/products/${id}`);
          }}
        >
          <img src={image} alt={title} />
        </div>

        <div className="cart-item-details-quantity-price-wrapper">
          <div className="cart-item-details">
            <div
              className="cart-item-title font-4"
              onClick={() => {
                navigate(`/products/${id}`);
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
                  onClick={() => {
                    if (selectedQuantity > 1) {
                      setSelectedQuantity(parseInt(selectedQuantity) - 1);
                      setCart((prevCart) => {
                        const newCart = { ...prevCart };
                        newCart.products = newCart.products.map((product) => {
                          if (product.id === id) {
                            product.quantity = parseInt(selectedQuantity) - 1;
                          }
                          return product;
                        });
                        return newCart;
                      });
                    }
                  }}
                >
                  -
                </div>
                <div className="cart-item-quantity-number">
                  <input
                    type="text"
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                    className="cart-item-quantity-number-input"
                  />
                </div>
                <div
                  className="cart-item-quantity-plus font-3"
                  onClick={() => {
                    if (selectedQuantity < maxQuantity) {
                      setSelectedQuantity(parseInt(selectedQuantity) + 1);
                      setCart((prevCart) => {
                        const newCart = { ...prevCart };
                        newCart.products = newCart.products.map((product) => {
                          if (product.id === id) {
                            product.quantity = parseInt(selectedQuantity) + 1;
                          }
                          return product;
                        });
                        return newCart;
                      });
                    }
                  }}
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
            onClick={() => {
              setCart((prevCart) => {
                const newCart = { ...prevCart };
                newCart.products = newCart.products.filter(
                  (product) => product.id !== id
                );
                return newCart;
              });
            }}
          >
            <img src="http://localhost:3001/delete.png" alt="trash" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
