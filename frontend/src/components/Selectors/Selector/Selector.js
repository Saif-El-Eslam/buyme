import React, { useEffect, useState, useRef } from "react";

import "./Selector.css";

function Selector({
  options,
  selectedOption,
  setSelectedOption,
  defaultOption,
}) {
  const showOptionsRef = useRef(null);

  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    console.log(selectedOption, defaultOption);
    if (!selectedOption && defaultOption) {
      setSelectedOption(defaultOption);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    <div className="selector font-3">
      <div className="selector-wrapper">
        {defaultOption && (
          <div
            className="selected-option"
            onClick={() => setShowOptions(!showOptions)}
          >
            {selectedOption?.label}
          </div>
        )}

        <div
          className="selector-arrow-wrapper"
          onClick={() => setShowOptions(!showOptions)}
        >
          <img
            className="selector-arrow-img"
            src="http://localhost:3001/arrow-down-black.png"
            alt="arrow"
          />
        </div>

        {showOptions && (
          <div className="selector-options" ref={showOptionsRef}>
            {options.map((option, i) => (
              <div
                key={i}
                className="selector-option"
                onClick={() => {
                  setSelectedOption(option);
                  setShowOptions(false);
                }}
              >
                <div>{option.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Selector;
