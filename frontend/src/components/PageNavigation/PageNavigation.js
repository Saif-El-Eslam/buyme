import React from "react";

import "./PageNavigation.css";

function PageNavigation({ pageNumber, setPageNumber, totalPages }) {
  return (
    <div className="page-navigation font-3">
      <div
        className="page-navigation-left"
        onClick={() => {
          if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
          }
        }}
      >
        <div className="page-navigation-left-arrow">
          <img src="/arrow-left-black.png" alt="arrow" />
        </div>
        {/* <div className="page-navigation-left-title">Prev</div> */}
      </div>

      <div className="page-navigation-pages">
        {pageNumber} / {totalPages}
      </div>

      <div
        className="page-navigation-right"
        onClick={() => {
          if (pageNumber < totalPages) {
            setPageNumber(pageNumber + 1);
          }
        }}
      >
        {/* <div className="page-navigation-right-title">Next</div> */}
        <div className="page-navigation-right-arrow">
          <img src="/arrow-right-black.png" alt="arrow" />
        </div>
      </div>
    </div>
  );
}

export default PageNavigation;
