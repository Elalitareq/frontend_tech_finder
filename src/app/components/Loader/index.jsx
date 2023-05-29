import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <svg viewBox="0 0 80 80">
          <circle id="test" cx="40" cy="40" r="32"></circle>
        </svg>
      </div>
    </div>
  );
};

export default Loader;
