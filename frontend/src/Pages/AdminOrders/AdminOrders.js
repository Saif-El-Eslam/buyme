import "./AdminOrders.css";
import Header from "../../components/Header/header";
import PageNavigation from "../../components/PageNavigation/PageNavigation";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminOrders() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);

  const orders = [
    {
      id: "6585933c31aa85240eafe96f",
      orderDate: "2021-09-01",
      totalPrice: 20,
      status: "ordered",
      customerEmail: "customer@shopping.com",
    },
    {
      id: 2,
      orderDate: "2021-09-01",
      totalPrice: 20,
      status: "ordered",
      customerEmail: "customer@shopping.com",
    },
    {
      id: 3,
      orderDate: "2021-09-01",
      totalPrice: 20,
      status: "ordered",
      customerEmail: "customer@shopping.com",
    },
    {
      id: 4,
      orderDate: "2021-09-01",
      totalPrice: 20,
      status: "ordered",
      customerEmail: "customer@shopping.com",
    },
  ];

  return (
    <div className="admin-orders">
      <Header />

      <div className="admin-orders-wrapper">
        <div className="admin-orders-header">
          <div className="admin-orders-title">All Orders</div>
        </div>

        <div className="admin-orders-list">
          <div className="admin-orders-list-header">
            <div className="admin-orders-list-header-id">id</div>
            <div className="admin-orders-list-header-email">Customer Email</div>
            <div className="admin-orders-list-header-date">Date</div>
            <div className="admin-orders-list-header-price">Price</div>
            <div className="admin-orders-list-header-status">Status</div>
          </div>

          {orders.map((order, i) => (
            <div
              className="admin-orders-list-item"
              key={i}
              onClick={() => {
                navigate(`/admin/orders/${order.id}`);
              }}
            >
              <div className="admin-orders-list-item-id">{order.id}</div>
              <div className="admin-orders-list-item-email">
                {order.customerEmail}
              </div>
              <div className="admin-orders-list-item-date">
                {order.orderDate}
              </div>
              <div className="admin-orders-list-item-price">
                ${order.totalPrice}
              </div>
              <div className="admin-orders-list-item-status">
                {order.status}
              </div>
            </div>
          ))}
        </div>

        <div className="admin-orders-navigation-wrapper">
          <PageNavigation
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalPages={10}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
