import "./Orders.css";
import Header from "../../components/Header/header";
import PageNavigation from "../../components/PageNavigation/PageNavigation";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import TokenService from "../../Services/AuthAPICalls";
import { getOrders } from "../../Services/OrderAPICalls";
import InfoMessage from "../../components/Messages/InfoMessage";

function AdminOrders() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [infomessage, setInfoMessage] = useState();
  const [infoMessageType, setInfoMessageType] = useState();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrders(pageNumber)
      .then((res) => {
        if (res?.status === 200) {
          setOrders(res.data.orders);
          setTotalPages(res.data.pagesCount);

          window.scrollTo(0, 0);
        } else {
          setInfoMessage(res?.data?.message);
          setInfoMessageType("error");
          setTimeout(() => {
            setInfoMessage("");
            setInfoMessageType("");
          }, 3000);
        }
        setLoading(false);
      })
      .catch((err) => {
        setInfoMessage(err?.data?.message);
        setInfoMessageType("error");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);
        setLoading(false);
      });
  }, [pageNumber]);

  return (
    <div className="admin-orders">
      <Header />

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

      {orders.length === 0 && (
        <div className="admin-orders-wrapper">
          <div className="admin-orders-empty">
            <div className="admin-orders-empty-title">No Orders Found</div>
            <div className="admin-orders-empty-subtitle">
              You have no orders yet
            </div>

            <div
              className="button-wrapper"
              onClick={() => {
                navigate("/products");
              }}
            >
              <div className="button-green">Get some Orders</div>
            </div>
          </div>
        </div>
      )}

      {orders.length > 0 && (
        <div className="admin-orders-wrapper">
          <div className="admin-orders-header">
            <div className="admin-orders-title">All Orders</div>
          </div>

          <div className="admin-orders-list">
            <div className="admin-orders-list-header">
              <div className="admin-orders-list-header-id">id</div>
              <div className="admin-orders-list-header-email">
                Customer Email
              </div>
              <div className="admin-orders-list-header-date">Date</div>
              <div className="admin-orders-list-header-price">Price</div>
              <div className="admin-orders-list-header-status">Status</div>
            </div>

            {orders.length > 0 &&
              orders?.map((order, i) => (
                <div
                  className="admin-orders-list-item"
                  key={i}
                  onClick={() => {
                    navigate(`/admin/orders/${order._id}`);
                  }}
                >
                  <div className="admin-orders-list-item-id">{order._id}</div>
                  <div className="admin-orders-list-item-email">
                    {order.user_id.email}
                  </div>
                  <div className="admin-orders-list-item-date">
                    {new Date(order.createdAt).toLocaleDateString("en-US")}
                  </div>
                  <div className="admin-orders-list-item-price">
                    ${order.total_price}
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
              totalPages={totalPages}
            />
          </div>
        </div>
      )}

      {TokenService.getRole() !== "admin" && <Footer />}
    </div>
  );
}

export default AdminOrders;
