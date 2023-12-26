import React, { useEffect, useState, useRef } from "react";

import "./MultiSelector.css";

function MultiSelector({
  options,
  selectedOptions,
  setSelectedOptions,
  defaultOption,
}) {
  const showOptionsRef = useRef(null);

  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (!selectedOptions && defaultOption) {
      setSelectedOptions(defaultOption);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // add option to the selected options if option.value is in on of the selected options.value, otherwise remove it
  const toggleOption = (option) => {
    const isSelected = selectedOptions.some((o) => {
      return o.value === option.value;
    });

    if (isSelected) {
      setSelectedOptions(
        selectedOptions.filter((o) => {
          return o.value !== option.value;
        })
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  useEffect(() => {
    // Function to handle clicks outside the menu
    const handleClickOutside = (event) => {
      if (
        showOptionsRef.current &&
        !showOptionsRef.current.contains(event.target)
      ) {
        // Clicked outside the menu, close the menu
        setShowOptions(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="multi-selector font-3">
      <div className="multi-selector-wrapper">
        {defaultOption && (
          <div
            className="selected-option"
            onClick={() => setShowOptions(!showOptions)}
          >
            {defaultOption.label}
          </div>
        )}

        <div
          className="multi-selector-arrow-wrapper"
          onClick={() => setShowOptions(!showOptions)}
        >
          <img
            className="multi-selector-arrow-img"
            src="http://localhost:3001/arrow-down-black.png"
            alt="arrow"
          />
        </div>

        {showOptions && (
          <div className="multi-selector-options" ref={showOptionsRef}>
            {options.map((option, i) => (
              <div
                key={i}
                className="multi-selector-option"
                onClick={() => {
                  toggleOption(option);
                  setShowOptions(true);
                }}
              >
                <div
                  className={`multi-selector-option-circle ${
                    selectedOptions.some((o) => o.value === option.value)
                      ? "multi-selector-option-circle-selected"
                      : ""
                  }`}
                ></div>
                <div> {option.label} </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MultiSelector;
