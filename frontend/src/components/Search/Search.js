import React, { useState, useRef, useEffect } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import InfoMessage from "../../components/Messages/InfoMessage";
import { getProductsByPage } from "../../Services/ProductsCalls";
import TokenService from "../../Services/AuthAPICalls";

function Search({ searchOpen, setSearchOpen }) {
  const navigate = useNavigate();
  const searchResultRef = useRef(null);
  const searchBarRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [infomessage, setInfoMessage] = useState();
  const [infoMessageType, setInfoMessageType] = useState();

  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);

  const admin = TokenService.getRole() === "admin" ? true : false;

  useEffect(() => {
    // Function to handle clicks outside the menu
    const handleClickOutside = (event) => {
      if (
        searchResultRef.current &&
        !searchResultRef.current.contains(event.target) &&
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        // Clicked outside the menu, close the menu
        setSearchOpen(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (searchValue.length > 0) {
      setLoading(true);
      getProductsByPage(
        1,
        { sortField: "title", sortDirection: 1 },
        [],
        searchValue
      ).then((res) => {
        if (res?.status === 200) {
          setProducts(res?.data?.products);
          setLoading(false);
        } else {
          setLoading(false);
          setInfoMessage(res?.data?.message);
          setInfoMessageType("error");
          setTimeout(() => {
            setInfoMessage("");
            setInfoMessageType("");
          }, 2000);
        }
      });
    }
  }, [searchValue]);

  useEffect(() => {
    if (searchOpen) {
      setSearchValue("");
      setProducts([]);
    }
  }, [searchOpen]);

  return (
    <div className="search">
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

      <div className="search-bar" ref={searchBarRef}>
        <div className="search-field">
          <input
            type="text"
            placeholder="search.."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoFocus={searchOpen}
          />
        </div>

        <div className="search-close-icon" onClick={() => setSearchOpen(false)}>
          <img src="/close.png" alt="search" />
        </div>
      </div>

      <div
        className="search-result"
        ref={searchResultRef}
        style={{
          display: searchValue && products.length > 0 ? "" : "none",
        }}
      >
        {products.length > 0 &&
          products.map((product, i) => (
            <div
              className="search-result-item"
              key={i}
              onClick={() => {
                admin
                  ? navigate(`/admin/products/${product?._id}/update`)
                  : navigate(`/products/${product?._id}`);

                setSearchOpen(false);
              }}
            >
              <div className="search-result-item-image">
                <img src={product?.images[0]} alt="search" />
              </div>

              <div className="search-result-item-content">
                <div className="search-result-item-content-title font-4">
                  {product?.title}
                </div>

                <div className="search-result-item-content-price font-5">
                  ${product?.price}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Search;
