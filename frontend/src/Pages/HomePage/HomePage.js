import "./HomePage.css";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ProductCard from "../../components/ProductCard/ProductCard";
import React, { useState } from "react";

function HomePage() {
  const [productsHome, setProductsHome] = useState([
    {
      category: "T-shirt",
      productName: "Cotton T-shirt",
      price: 20,
      imgURL: "http://localhost:3001/categories/t-shirt.jpg",
    },
    {
      category: "shirt",
      productName: "Green Cotton shirt",
      price: 20,
      imgURL: "http://localhost:3001/categories/shirt.jpg",
    },
    {
      category: "Shorts",
      productName: "Blue Jeens Cargo Shorts",
      price: 20,
      imgURL: "http://localhost:3001/categories/shorts.jpg",
    },
    {
      category: "Pants",
      productName: "Olive Cargo Pants",
      price: 20,
      imgURL: "http://localhost:3001/categories/pants.jpg",
    },
    {
      category: "Jacket",
      productName: "Black Bomber Jacket",
      price: 20,
      imgURL: "http://localhost:3001/categories/jacket.jpg",
    },
    {
      category: "Hoodie",
      productName: "Green Cotton Hoodie",
      price: 20,
      imgURL: "http://localhost:3001/categories/hoodie.jpg",
    },
  ]);

  //  swipe the products every 3 seconds
  const swipeProductsByOne = (direction) => {
    if (direction === "right") {
      let firstProduct = productsHome.shift();
      productsHome.push(firstProduct);
      setProductsHome([...productsHome]);
    } else {
      let lastProduct = productsHome.pop();
      productsHome.unshift(lastProduct);
      setProductsHome([...productsHome]);
    }
  };
  return (
    <div className="home-page">
      <Header />
      <div className="home-page-content">
        <div className="section-1">
          <div className="section-1-wrapper">
            <div className="section-1-wrapper-title font-2">
              The best to buy All time, <br /> any occasion!
            </div>

            <div className="section-1-wrapper-slogan font-3">
              Fit all your needs.
            </div>

            <div className="button-wrapper font-3">
              <div className="button-white">Shop Now</div>
            </div>
          </div>
        </div>

        <div className="section-2">
          <div className="section-2-wrapper">
            <div className="section-2-wrapper-title font-2">
              From timeless classics to the latest trends, redefine your style
              with our curated collection.
            </div>

            <div className="section-2-wrapper-categories-cards">
              <div className="category-card-wrapper">
                <CategoryCard
                  category={"T-shirts"}
                  imgURL={"http://localhost:3001/categories/T-shirt.jpg"}
                />
              </div>
              <div className="category-card-wrapper">
                <CategoryCard
                  category={"Shirts"}
                  imgURL={"http://localhost:3001/categories/shirt.jpg"}
                />
              </div>

              <div className="category-card-wrapper">
                <CategoryCard
                  category={"Pants"}
                  imgURL={"http://localhost:3001/categories/pants.jpg"}
                />
              </div>

              <div className="category-card-wrapper">
                <CategoryCard
                  category={"Shorts"}
                  imgURL={"http://localhost:3001/categories/shorts.jpg"}
                />
              </div>

              <div className="category-card-wrapper">
                <CategoryCard
                  category={"Jackets"}
                  imgURL={"http://localhost:3001/categories/jacket.jpg"}
                />
              </div>

              <div className="category-card-wrapper">
                <CategoryCard
                  category={"Hoodies"}
                  imgURL={"http://localhost:3001/categories/hoodie.jpg"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="section-3">
          <div className="section-3-upper-wrapper">
            <div className="section-3-wrapper-title font-2">
              Get Them Before They're Gone
            </div>

            <div className="section-3-wrapper-slogan font-3">
              Wear your confidence, one outfit at a time. Explore our wardrobe
              essentials designed to make you look and feel your best.
            </div>

            <div className="button-wrapper font-3">
              <div className="button-green">Take A Look</div>
            </div>
          </div>

          <div className="section-3-wrapper-items-cards-wrapper">
            <div className="section-3-wrapper-items-cards-container">
              <div
                className="section-3-wrapper-items-cards-arrow"
                onClick={() => swipeProductsByOne("left")}
              >
                <img
                  className="section-3-wrapper-items-cards-arrow-img"
                  src="http://localhost:3001/arrow-left-black.png"
                  alt="arrow"
                />
              </div>

              <div className="section-3-wrapper-items-cards">
                {productsHome.map((product, i) => (
                  <div key={i} className="product-card-wrapper">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              <div
                className="section-3-wrapper-items-cards-arrow"
                onClick={() => swipeProductsByOne("right")}
              >
                <img
                  className="section-3-wrapper-items-cards-arrow-img"
                  src="http://localhost:3001/arrow-right-black.png"
                  alt="arrow"
                />
              </div>
            </div>

            <div className="button-wrapper font-3 section-section-3-products-button">
              <div className="button-border-green font-5">Discover All</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
