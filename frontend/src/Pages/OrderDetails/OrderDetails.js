import "./OrderDetails.css";
import Header from "../../components/Header/header";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function OrderDetails() {
  const admin = true;
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    id: useParams().id,
    orderDate: "2021-09-01",
    totalPrice: 320,
    status: "ordered",
    customerEmail: "customer@shopping.com",
    delivery_address: {
      street: "123 Main St",
      city: "New York",
      governorate: "New York",
      country: "USA",
    },
    payment_method: {
      card_number: "1234 1234 1234 1234",
      method: "Visa",
    },
    products: [
      {
        id: "6585933c31aa85240eafe96f",
        title: "Nike Slim Shirt",
        price: 120,
        image: "http://localhost:3001/close.png",
        quantity: 3,
        size: "M",
      },
      {
        id: 2,
        title: "Nike Slim Shirt",
        price: 20,
        image: "http://localhost:3001/close.png",
        quantity: 1,
        size: "L",
      },
      {
        id: 3,
        title: "Nike Slim Shirt",
        price: 20,
        image: "http://localhost:3001/close.png",
        quantity: 1,
        size: "L",
      },
      {
        id: 4,
        title: "Nike Slim Shirt",
        price: 20,
        image: "http://localhost:3001/close.png",
        quantity: 1,
        size: "L",
      },
    ],
  });

  return (
    <div className="order-details">
      <Header />

      <div className="order-details-wrapper">
        <div className="order-details-orders-link-wrapper">
          <div
            className="order-details-orders-link"
            onClick={() => navigate("/admin/orders")}
          >
            /orders
          </div>
        </div>

        <div className="order-details-header">
          <div className="order-details-title">Order Details</div>

          {order.status === "ordered" && (
            <div className="order-details-button-wrapper button-wrapper">
              <div className="button-border-green">
                {admin ? "Set as Delivered" : "Cancel Order"}
              </div>
            </div>
          )}
        </div>

        <div className="order-info-details-wrapper">
          <div className="order-info-details-items-wrapper-2">
            <div className="order-info-details-body-item">
              <div className="order-info-details-body-item-title font-3">
                Order ID
              </div>
              <div className="order-info-details-body-item-value font-0">
                {order.id}
              </div>
            </div>

            <div className="order-info-details-body-item">
              <div className="order-info-details-body-item-title font-3">
                Customer Email
              </div>
              <div className="order-info-details-body-item-value font-0">
                {order.customerEmail}
              </div>
            </div>
          </div>

          <div className="order-info-details-items-wrapper-3">
            <div className="order-info-details-body-item">
              <div className="order-info-details-body-item-title font-3">
                Order Date
              </div>
              <div className="order-info-details-body-item-value font-0">
                {order.orderDate}
              </div>
            </div>

            <div className="order-info-details-body-item">
              <div className="order-info-details-body-item-title font-3">
                Total Price
              </div>
              <div className="order-info-details-body-item-value font-0">
                {order.totalPrice}
              </div>
            </div>

            <div className="order-info-details-body-item">
              <div className="order-info-details-body-item-title font-3">
                Status
              </div>
              <div className="order-info-details-body-item-value font-0">
                {order.status}
              </div>
            </div>
          </div>

          <div className="order-info-details-body-item">
            <div className="order-info-details-body-item-title font-3">
              Delivery Address
            </div>
            <div className="order-info-details-body-item-value font-0">
              {order.delivery_address.street}, {order.delivery_address.city},{" "}
              {order.delivery_address.governorate},{" "}
              {order.delivery_address.country}
            </div>
          </div>

          <div className="order-info-details-items-wrapper-2">
            <div className="order-info-details-body-item">
              <div className="order-info-details-body-item-title font-3">
                Card Number
              </div>
              <div className="order-info-details-body-item-value font-0">
                {order.payment_method.card_number}
              </div>
            </div>

            <div className="order-info-details-body-item">
              <div className="order-info-details-body-item-title font-3">
                Payment Method
              </div>
              <div className="order-info-details-body-item-value font-0">
                {order.payment_method.method}
              </div>
            </div>
          </div>

          <div className="order-info-details-body-item-products">
            <div className="order-info-details-body-item-title font-3">
              Products
            </div>

            <div className="order-info-details-body-item-products-list">
              {order.products.map((product, i) => (
                <div className="order-info-details-body-item-products-list-item">
                  <div className="order-info-details-body-item-products-list-item-image">
                    <img src={product.image} alt="" />
                  </div>

                  <div className="order-info-details-body-item-products-list-item-details-wrapper">
                    <div className="order-info-details-body-item-products-list-item-id">
                      <div className="order-info-details-body-item-products-list-item-id-title font-0">
                        ID:
                      </div>
                      <div className="order-info-details-body-item-products-list-item-id-value font-0">
                        {product.id}
                      </div>
                    </div>

                    <div className="order-info-details-body-item-products-list-item-details">
                      <div className="order-info-details-body-item-products-list-item-details-title font-3">
                        {product.title}
                      </div>
                      <div className="order-info-details-body-item-products-list-item-details-size font-0">
                        Size: {product.size}
                      </div>
                      <div className="order-info-details-body-item-products-list-item-details-quantity font-0">
                        Qty: {product.quantity}
                      </div>
                      <div className="order-info-details-body-item-products-list-item-details-price font-0">
                        ${product.price} X {product.quantity} = $
                        {product.price * product.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
