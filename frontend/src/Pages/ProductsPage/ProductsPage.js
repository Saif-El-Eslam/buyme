import React, { useEffect, useState } from "react";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import Filter from "../../components/Filter/Filter";
import ProductCard from "../../components/ProductCard/ProductCard";
import PageNavigation from "../../components/PageNavigation/PageNavigation";
import "./ProductsPage.css";
import { getProductsByPage } from "../../Services/ProductsCalls";

function ProductsPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [sort, setSort] = useState({});
  const [size, setSize] = useState([]);
  const [totalProductsNumber, setTotalProductsNumber] = useState(0);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLoading(true);
    getProductsByPage(
      pageNumber,
      sort,
      size.map((size) => size.value)
    ).then((res) => {
      if (res?.status === 200) {
        setProducts(res?.data?.products);
        setTotalPages(res?.data?.pagesCount);
        setTotalProductsNumber(res?.data?.totalProducts);
        if (res?.data?.pagesCount < pageNumber) {
          setPageNumber(res?.data?.pagesCount);
        }
      } else {
        // console.log(res?.data?.message);
      }
      setLoading(false);
    });
  }, [pageNumber, sort, size]);

  // console.log(products);

  return (
    <div className="products-page">
      <Header />
      <div className="products-page-content">
        {loading && (
          <div className="loader-wrapper">
            <div className="loader"></div>
          </div>
        )}

        <div className="title-section font-0">
          <h1>All Products</h1>
        </div>

        <div className="filters-section">
          <Filter
            setSort={setSort}
            setSize={setSize}
            totalProductsNumber={totalProductsNumber}
          />
        </div>

        <div className="products-section">
          <div className="products-page-products-wrapper">
            {products?.map((product, index) => {
              return (
                <div className="products-page-product-card-wrapper" key={index}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>

          <div className="page-navigation-wrapper">
            <PageNavigation
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductsPage;
