import React from "react";
import "./ProductDetails.css";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import { useRef } from "react";

function ProductDetails() {
  const openedImageRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [quantityEditable, setQuantityEditable] = useState(false);

  const product = {
    category: "T-shirt",
    productName: "Cotton T-shirt",
    price: 20,
    images: [
      "http://localhost:3001/categories/t-shirt.jpg",
      "http://localhost:3001/categories/shirt.jpg",
      "http://localhost:3001/categories/shorts.jpg",
      "http://localhost:3001/categories/pants.jpg",
      "http://localhost:3001/categories/jacket.jpg",
      "http://localhost:3001/categories/hoodie.jpg",
    ],
    description: "This is a T-shirt made of cotton. It is very comfortable.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    quantity: 10,
  };

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
    }
  };

  return (
    <div className="product-details">
      <Header />

      <div className="product-details-content">
        <div className="product-details-left">
          <div className="product-details-left-images-wrapper">
            {product.images.map((image, i) => {
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
              {product.productName}
            </div>

            <div className="product-details-right-category font-5">
              {product.category}
            </div>

            <div className="product-details-right-price font-5">
              ${product.price}
            </div>
          </div>

          <div className="product-details-right-section">
            <div className="product-details-right-size font-3">
              <div className="product-details-right-size-title font-3">
                Available Sizes
              </div>
              <div className="product-details-right-size-options font-3">
                {product.sizes.map((size) => {
                  return (
                    <div
                      key={size}
                      className={
                        "product-details-right-size-option font-3" +
                        (selectedSize === size
                          ? " product-details-right-size-option-selected"
                          : "")
                      }
                      onClick={() => toggleSelectedSize(size)}
                    >
                      {size}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="product-details-right-quantity font-3">
              <div className="product-details-right-quantity-title font-3">
                Quantity
              </div>
              <div className="product-details-right-quantity-wrapper font-3">
                <div
                  className="product-details-right-quantity-minus font-1"
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
                  className="product-details-right-quantity-plus font-3"
                  onClick={() => {
                    if (selectedQuantity < product.quantity) {
                      setSelectedQuantity(selectedQuantity + 1);
                    }
                  }}
                >
                  +
                </div>
              </div>

              <div className="product-details-right-quantity-available font-3">
                {product.quantity} available
              </div>
            </div>

            <div className="product-details-right-add-to-cart button-wrapper font-3">
              <div className="button-green">Add to Cart</div>
            </div>
          </div>

          <div className="product-details-right-section">
            <div className="product-details-right-description-title font-5">
              Description
            </div>

            <div className="product-details-right-description font-3">
              {product.description}
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

          <div
            className="product-details-images-opened-arrow-left"
            onClick={() => handleNextPrevImage("prev")}
          >
            <img src="/arrow-left.png" alt="arrow" />
          </div>

          <div className="product-details-images-opened-image">
            <img src={selectedImage} alt="product" />
          </div>

          <div
            className="product-details-images-opened-arrow-right"
            onClick={() => handleNextPrevImage("next")}
          >
            <img src="/arrow-right.png" alt="arrow" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductDetails;
