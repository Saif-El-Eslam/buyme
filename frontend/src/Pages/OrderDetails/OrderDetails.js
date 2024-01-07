import "./OrderDetails.css";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getOrderById, updateOrderStatus } from "../../Services/OrderAPICalls";
import InfoMessage from "../../components/Messages/InfoMessage";
import TokenService from "../../Services/AuthAPICalls";

function OrderDetails() {
  const { id } = useParams();
  const admin = TokenService.getRole() === "admin" ? true : false;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [infomessage, setInfoMessage] = useState();
  const [infoMessageType, setInfoMessageType] = useState();

  const [order, setOrder] = useState({});

  useEffect(() => {
    setLoading(true);
    getOrderById(id)
      .then((res) => {
        if (res?.status === 200) {
          setOrder(res.data);
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
        console.log(err?.data?.message);
        setLoading(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStatusChange = () => {
    setLoading(true);

    const newStatus = admin ? "delivered" : "cancelled";

    updateOrderStatus(id, newStatus)
      .then((res) => {
        console.log(res);
        if (res?.status === 200) {
          setOrder(res?.data);
          setInfoMessage(
            admin
              ? "Order status updated successfully"
              : "Order cancelled successfully"
          );
          setInfoMessageType("info");
          setTimeout(() => {
            setInfoMessage("");
            setInfoMessageType("");
          }, 3000);
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
        console.log(err?.data?.message);
        setLoading(false);
      });
  };

  return (
    <div className="order-details">
      <Header />

      <div className="order-details-wrapper">
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

        <div className="order-details-orders-link-wrapper">
          <div
            className="order-details-orders-link"
            onClick={() =>
              admin ? navigate("/admin/orders") : navigate("/orders")
            }
          >
            /orders
          </div>
        </div>

        <div className="order-details-header">
          <div className="order-details-title">Order Details</div>

          {order.status === "ordered" && (
            <div
              className="order-details-button-wrapper button-wrapper"
              onClick={() => handleStatusChange()}
            >
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
                {order._id}
              </div>
            </div>

            <div className="order-info-details-body-item">
              <div className="order-info-details-body-item-title font-3">
                Customer Email
              </div>
              <div className="order-info-details-body-item-value font-0">
                {order?.user_id?.email}
              </div>
            </div>
          </div>

          <div className="order-info-details-items-wrapper-3">
            <div className="order-info-details-body-item">
              <div className="order-info-details-body-item-title font-3">
                Order Date
              </div>
              <div className="order-info-details-body-item-value font-0">
                {new Date(order?.createdAt).toLocaleDateString("en-US")}
              </div>
            </div>

            <div className="order-info-details-body-item">
              <div className="order-info-details-body-item-title font-3">
                Total Price
              </div>
              <div className="order-info-details-body-item-value font-0">
                {order.total_price}
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
              {order.delivery_address?.street}, {order.delivery_address?.city},{" "}
              {order.delivery_address?.governorate},{" "}
              {order.delivery_address?.country}
            </div>
          </div>

          <div className="order-info-details-items-wrapper-2">
            {/* <div className="order-info-details-body-item">
              <div className="order-info-details-body-item-title font-3">
                Card Number
              </div>
              <div className="order-info-details-body-item-value font-0">
                {order.payment_method?.card_number}
              </div>
            </div> */}

            <div className="order-info-details-body-item">
              <div className="order-info-details-body-item-title font-3">
                Payment Method
              </div>
              <div className="order-info-details-body-item-value font-0">
                {order.payment_method?.payment_type}
              </div>
            </div>
          </div>

          <div className="order-info-details-body-item-products">
            <div className="order-info-details-body-item-title font-3">
              Products
            </div>

            <div className="order-info-details-body-item-products-list">
              {order.products?.map((product, i) => (
                <div
                  className="order-info-details-body-item-products-list-item"
                  key={i}
                >
                  <div className="order-info-details-body-item-products-list-item-image">
                    <img src={product.product_id.images[0]} alt="" />
                  </div>

                  <div className="order-info-details-body-item-products-list-item-details-wrapper">
                    <div className="order-info-details-body-item-products-list-item-id">
                      <div className="order-info-details-body-item-products-list-item-id-title font-0">
                        ID:
                      </div>
                      <div className="order-info-details-body-item-products-list-item-id-value font-0">
                        {product.product_id._id}
                      </div>
                    </div>

                    <div className="order-info-details-body-item-products-list-item-details">
                      <div className="order-info-details-body-item-products-list-item-details-title font-4">
                        {product.product_id.title}
                      </div>
                      <div className="order-info-details-body-item-products-list-item-details-size font-0">
                        Size: {product.size}
                      </div>
                      <div className="order-info-details-body-item-products-list-item-details-quantity font-0">
                        Qty: {product.quantity}
                      </div>
                      <div className="order-info-details-body-item-products-list-item-details-price font-0">
                        ${product.product_id.price} X {product.quantity} = $
                        {product.product_id.price * product.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {!admin && <Footer />}
    </div>
  );
}

export default OrderDetails;
