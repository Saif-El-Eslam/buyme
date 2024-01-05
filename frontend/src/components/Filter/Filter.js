import React from "react";
import "./Filter.css";
import MultiSelector from "../Selectors/MultiSelector/MultiSelector";
import { useState, useEffect } from "react";
import Selector from "../Selectors/Selector/Selector";

function Filter({ setSize, setSort, totalProductsNumber }) {
  const sizeOptions = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
  ];

  const sortOptions = [
    {
      id: 1,
      value: {
        sortBy: "quantity",
        sortDirection: -1,
      },
      label: "Featured",
    },
    {
      id: 2,
      value: {
        sortField: "price",
        sortDirection: -1,
      },
      label: "Price (High to Low)",
    },
    {
      id: 3,
      value: {
        sortField: "price",
        sortDirection: 1,
      },
      label: "Price (Low to High)",
    },
    {
      id: 4,
      value: {
        sortField: "createdAt",
        sortDirection: 1,
      },
      label: "Date (Old to New)",
    },
    {
      id: 5,
      value: {
        sortField: "createdAt",
        sortDirection: -1,
      },
      label: "Date (New to Old)",
    },
  ];

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedSort, setSelectedSort] = useState();

  const removeSelectedSize = (size) => {
    setSelectedSizes(
      selectedSizes.filter((selectedSize) => {
        return selectedSize.value !== size.value;
      })
    );
  };

  useEffect(() => {
    setSort(selectedSort?.value);
  }, [selectedSort]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSize(selectedSizes);
  }, [selectedSizes]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="filter">
      <div className="filter-wrapper">
        <div className="filter-left">
          <div className="filter-left-title font-5">Filter:</div>
          <div className="selector-container-sizes">
            <MultiSelector
              options={sizeOptions}
              selectedOptions={selectedSizes}
              setSelectedOptions={setSelectedSizes}
              defaultOption={{ value: "", label: "Sizes" }}
            />
          </div>
        </div>

        <div className="filter-right">
          <div className="filter-right-sort">
            <div className="filter-right-sort-title font-5">Sort by:</div>
            <div className="selector-container-sort">
              <Selector
                options={sortOptions}
                selectedOption={selectedSort}
                setSelectedOption={setSelectedSort}
                defaultOption={sortOptions[0]}
              />
            </div>
          </div>

          <div className="filter-right-products-num font-5">
            {totalProductsNumber} products
          </div>
        </div>
      </div>

      <div className="filter-selected-options">
        {selectedSizes.map((option) => {
          return (
            <div
              className="filter-selected-option font-3"
              key={option?.value}
              onClick={() => removeSelectedSize(option)}
            >
              Size: {option.label}{" "}
              <span className="filter-selected-option-x">✖</span>
            </div>
          );
        })}

        {selectedSizes[0] && (
          <div
            className="filter-remove-all font-3"
            onClick={() => setSelectedSizes([])}
          >
            Remove All
          </div>
        )}
      </div>
    </div>
  );
}

export default Filter;
