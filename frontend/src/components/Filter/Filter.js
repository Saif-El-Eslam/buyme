import React from "react";
import "./Filter.css";
import MultiSelector from "../Selectors/MultiSelector/MultiSelector";
import { useState } from "react";
import Selector from "../Selectors/Selector/Selector";

function Filter() {
  const sizeOptions = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
  ];

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "priceHL", label: "Price (High to Low)" },
    { value: "priceLH", label: "Price (Low to High)" },
    { value: "dateON", label: "Date (Old to New)" },
    { value: "dateNO", label: "Date (New to Old)" },
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
                defaultOption={{ value: "featured", label: "Featured" }}
              />
            </div>
          </div>

          <div className="filter-right-products-num font-5">39 products</div>
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
