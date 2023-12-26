import React, { useEffect, useState } from "react";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import Filter from "../../components/Filter/Filter";
import ProductCard from "../../components/ProductCard/ProductCard";
import PageNavigation from "../../components/PageNavigation/PageNavigation";
import "./CategoryProducts.css";
import { useParams } from "react-router-dom";

function CategoryProducts() {
  const { category } = useParams();

  const [pageNumber, setPageNumber] = useState(1);
  const categoryProducts = [
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
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="category-products-page">
      <Header />
      <div className="category-products-page-content">
        <div className="title-section font-0">
          <h1>{category.toLocaleUpperCase()}</h1>
        </div>

        <div className="filters-section">
          <Filter />
        </div>

        <div className="category-products-section">
          <div className="category-products-page-products-wrapper">
            {categoryProducts.map((product, index) => {
              return (
                <div
                  className="category-products-page-product-card-wrapper"
                  key={index}
                >
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>

          <div className="page-navigation-wrapper">
            <PageNavigation
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalPages={10}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CategoryProducts;
