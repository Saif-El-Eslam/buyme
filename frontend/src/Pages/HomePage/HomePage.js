import "./HomePage.css";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ProductCard from "../../components/ProductCard/ProductCard";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNProductsPerCategory } from "../../Services/ProductsCalls";

function HomePage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [productsHome, setProductsHome] = useState();

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

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    getNProductsPerCategory(1).then((res) => {
      if (res.status === 200) {
        setProductsHome(res.data);
      }
      setLoading(false);
    });
  }, []);
  return (
    <div className="home-page">
      <Header />
      <div className="home-page-content">
        {loading && (
          <div className="loader-wrapper">
            <div className="loader"></div>
          </div>
        )}

        <div className="section-1">
          <div className="section-1-wrapper">
            <div className="section-1-wrapper-title font-2">
              The best to buy All time, <br /> any occasion!
            </div>

            <div className="section-1-wrapper-slogan font-3">
              Fit all your needs.
            </div>

            <div
              className="button-wrapper font-3"
              onClick={() => navigate("/products")}
            >
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
                  imgURL={"/categories/T-shirt.jpg"}
                />
              </div>
              <div className="category-card-wrapper">
                <CategoryCard
                  category={"shirts"}
                  imgURL={"/categories/shirt.jpg"}
                />
              </div>

              <div className="category-card-wrapper">
                <CategoryCard
                  category={"pants"}
                  imgURL={"/categories/pants.jpg"}
                />
              </div>

              <div className="category-card-wrapper">
                <CategoryCard
                  category={"shorts"}
                  imgURL={"/categories/shorts.jpg"}
                />
              </div>

              <div className="category-card-wrapper">
                <CategoryCard
                  category={"jackets"}
                  imgURL={"/categories/jacket.jpg"}
                />
              </div>

              <div className="category-card-wrapper">
                <CategoryCard
                  category={"hoodies"}
                  imgURL={"/categories/hoodie.jpg"}
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

            <div
              className="button-wrapper font-3"
              onClick={() => navigate("/products")}
            >
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
                  src="/arrow-left-black.png"
                  alt="arrow"
                />
              </div>

              <div className="section-3-wrapper-items-cards">
                {productsHome?.map((product, i) => (
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
                  src="/arrow-right-black.png"
                  alt="arrow"
                />
              </div>
            </div>

            <div
              className="button-wrapper font-3 section-section-3-products-button"
              onClick={() => navigate("/products")}
            >
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
