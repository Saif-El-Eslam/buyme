import React from "react";
import "./InfoMessage.css";

const InfoMessage = ({ message, type, setMessage }) => {
  return (
    <div className="alert" onClick={() => setMessage("")}>
      <div className={`alert-wrapper alert-${type}`}>
        <div className="alert-message">{message}</div>
        {/* <div className="button-wrapper alert-button-wrapper" onClick={onClose}>
          <div className="button-green">Ok</div>
        </div> */}
      </div>
    </div>
  );
};

export default InfoMessage;
