import React from "react";
import "./ProductDetails.css";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import { getProductById } from "../../Services/ProductsCalls";
import { addToCart } from "../../Services/CartAPICalls";
import TokenService from "../../Services/AuthAPICalls";
import InfoMessage from "../../components/Messages/InfoMessage";
import { useNavigate } from "react-router-dom";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const openedImageRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [infomessage, setInfoMessage] = useState();
  const [infoMessageType, setInfoMessageType] = useState();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [quantityEditable, setQuantityEditable] = useState(false);

  const [product, setProduct] = useState({});

  useEffect(() => {
    setLoading(true);
    getProductById(id).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNextPrevImage = (direction) => {
    const currentImageIndex = product.images.indexOf(selectedImage);
    if (direction === "next") {
      if (currentImageIndex === product.images.length - 1) {
        setSelectedImage(product.images[0]);
      } else {
        setSelectedImage(product.images[currentImageIndex + 1]);
      }
    } else {
      if (currentImageIndex === 0) {
        setSelectedImage(product.images[product.images.length - 1]);
      } else {
        setSelectedImage(product.images[currentImageIndex - 1]);
      }
    }
  };

  const toggleSelectedSize = (size) => {
    if (selectedSize === size) {
      setSelectedSize("");
    } else {
      setSelectedSize(size);
      if (size.quantity < selectedQuantity) {
        setSelectedQuantity(size.quantity);
      }
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setInfoMessage("Please select a size");
      setInfoMessageType("error");
      setTimeout(() => {
        setInfoMessage("");
        setInfoMessageType("");
      }, 3000);
      return;
    }

    if (!TokenService.getToken()) {
      setInfoMessage("You need to login first");
      setInfoMessageType("error");
      setTimeout(() => {
        setInfoMessage("");
        setInfoMessageType("");

        navigate("/profile/login");
      }, 1500);
    } else {
      setLoading(true);
      addToCart(product._id, selectedQuantity, selectedSize.size).then(
        (res) => {
          if (res?.status === 200) {
            setInfoMessage(res.data.message);
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
        }
      );
    }
  };

  return (
    <div className="product-details">
      <Header />

      <div className="product-details-content">
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

        <div className="product-details-left">
          <div className="product-details-left-images-wrapper">
            {product?.images?.map((image, i) => {
              return (
                <div
                  key={i}
                  className="product-details-left-image"
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image} alt="product" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="product-details-right">
          <div className="product-details-right-section">
            <div className="product-details-right-title font-4">
              {product?.title}
            </div>

            <div className="product-details-right-category font-5">
              {product?.category}
            </div>

            <div className="product-details-right-price font-5">
              ${product?.price}
            </div>
          </div>

          <div className="product-details-right-section">
            <div className="product-details-right-size font-3">
              <div className="product-details-right-size-title font-3">
                Available Sizes
              </div>
              <div className="product-details-right-size-options font-3">
                {product?.sizes?.map((size) => {
                  return (
                    <div
                      key={size.size}
                      className={
                        size.quantity > 0
                          ? "product-details-right-size-option font-3" +
                            (selectedSize.size === size.size
                              ? " product-details-right-size-option-selected"
                              : "")
                          : "product-details-right-size-option-disabled font-3"
                      }
                      onClick={() => toggleSelectedSize(size)}
                    >
                      {size.size}
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedSize && (
              <div className="product-details-right-quantity font-3">
                <div className="product-details-right-quantity-title font-3">
                  Quantity
                </div>
                <div className="product-details-right-quantity-wrapper font-3">
                  <div
                    className={
                      selectedQuantity > 1
                        ? "product-details-right-quantity-minus font-1"
                        : "product-details-right-quantity-minus-disabled font-1"
                    }
                    onClick={() => {
                      if (selectedQuantity > 1) {
                        setSelectedQuantity(selectedQuantity - 1);
                      }
                    }}
                  >
                    -
                  </div>
                  <div
                    className="product-details-right-quantity-number font-3"
                    onClick={() => setQuantityEditable(true)}
                  >
                    {quantityEditable ? (
                      <input
                        type="text"
                        value={selectedQuantity}
                        onChange={(e) => {
                          if (e.target.value > product.quantity) {
                            setSelectedQuantity(product.quantity);
                          } else {
                            setSelectedQuantity(e.target.value);
                          }
                        }}
                        onBlur={() => {
                          setQuantityEditable(false);
                          if (selectedQuantity === "" || selectedQuantity < 1) {
                            setSelectedQuantity(1);
                          }
                        }}
                      />
                    ) : (
                      selectedQuantity
                    )}
                  </div>
                  <div
                    className={
                      selectedQuantity < selectedSize?.quantity || !selectedSize
                        ? "product-details-right-quantity-plus font-3"
                        : "product-details-right-quantity-plus-disabled font-3"
                    }
                    onClick={() => {
                      if (selectedQuantity < selectedSize.quantity) {
                        setSelectedQuantity(selectedQuantity + 1);
                      }
                    }}
                  >
                    +
                  </div>
                </div>

                <div className="product-details-right-quantity-available font-3">
                  {product?.quantity} all products
                  <br />
                  {selectedSize?.quantity} size {selectedSize?.size}
                </div>
              </div>
            )}

            <div
              className="product-details-right-add-to-cart button-wrapper font-3"
              onClick={handleAddToCart}
            >
              <div className="button-green">Add to Cart</div>
            </div>
          </div>

          <div className="product-details-right-section">
            <div className="product-details-right-description-title font-5">
              Description
            </div>

            <div className="product-details-right-description font-3">
              {product?.description}
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="product-details-images-opened"
          ref={openedImageRef}
          onClick={(e) => {
            if (e.target === openedImageRef.current) {
              setSelectedImage("");
            }
          }}
        >
          <div
            className="product-details-images-opened-close"
            onClick={() => setSelectedImage("")}
          >
            <img src="/close-white.png" alt="close" />
          </div>

          {product?.images.length > 1 && (
            <div
              className="product-details-images-opened-arrow-left"
              onClick={() => handleNextPrevImage("prev")}
            >
              <img src="/arrow-left.png" alt="arrow" />
            </div>
          )}

          <div className="product-details-images-opened-image">
            <img src={selectedImage} alt="product" />
          </div>

          {product?.images.length > 1 && (
            <div
              className="product-details-images-opened-arrow-right"
              onClick={() => handleNextPrevImage("next")}
            >
              <img src="/arrow-right.png" alt="arrow" />
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductDetails;
