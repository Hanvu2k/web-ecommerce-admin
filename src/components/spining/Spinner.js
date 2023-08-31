import React from "react";

import "./spinner.css";

function Spinning({ children, spinning }) {
  return (
    <div className="spinner-spinning ">
      {children}
      {spinning && (
        <div className="spinner-wrapper">
          <div className="rounded"></div>
        </div>
      )}
    </div>
  );
}

export default Spinning;
