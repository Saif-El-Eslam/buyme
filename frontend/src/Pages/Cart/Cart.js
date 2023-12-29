import React, { useEffect, useState } from "react";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import CartItem from "../../components/CartItem/CartItem";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState({
    products: [
      {
        id: 1,
        title: "Cotton T-shirt",
        image: "http://localhost:3001/categories/T-Shirt.jpg",
        price: 50,
        quantity: 3,
        size: "M",
      },
      {
        id: 2,
        title: "Olive Cargo Pants",
        image: "http://localhost:3001/categories/pants.jpg",
        price: 15,
        quantity: 1,
        size: "M",
      },
    ],
    total_price: 165,
  });

  // update total price when cart changes
  useEffect(() => {
    let total = 0;
    cart.products.forEach((product) => {
      total += product.price * product.quantity;
    });
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      newCart.total_price = total;
      return newCart;
    });
  }, [cart.products]);

  console.log(cart.products);

  return (
    <div className="carts-page">
      <Header />

      <div className="carts-page-content">
        <div className="carts-page-title">
          <h1>Your Cart</h1>
        </div>

        {(!cart || !cart.products.length) && (
          <div className="carts-page-empty">
            <h2 className="carts-page-empty-header">Your cart is empty</h2>
            <p className="carts-page-empty-text">
              Looks like you haven't added anything to your cart yet
            </p>

            <div
              className="button-wrapper"
              onClick={() => {
                window.location.href = "/products";
              }}
            >
              <div className="button-green">Continue Shopping</div>
            </div>
          </div>
        )}

        {cart && cart.products.length > 0 && (
          <div className="carts-page-list">
            <div className="cart-items-wrapper">
              {cart.products.map((product, i) => (
                <div className="cart-item-container" key={i}>
                  <CartItem
                    product={product}
                    setCart={setCart}
                    maxQuantity={50}
                  />
                </div>
              ))}
            </div>

            <div className="cart-total-submit-wrapper">
              <div className="cart-total-wrapper">
                <div className="cart-total-title font-2">Total Price:</div>
                <div className="cart-total-price">${cart.total_price}</div>
              </div>

              <div className="cart-submit-wrapper button-wrapper">
                <div className="button-green">Checkout</div>
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
