import React from "react";
import "./InfoMessage.css";

const InfoMessage = ({ message, type, onClose }) => {
  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-wrapper">
        <div className="alert-message">{message}</div>
        {/* <div className="button-wrapper alert-button-wrapper" onClick={onClose}>
          <div className="button-green">Ok</div>
        </div> */}
      </div>
    </div>
  );
};

export default InfoMessage;
