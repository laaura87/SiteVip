import React from "react";
import "./style.css";

function Component({ image, name }) {
  return (
    <div className="item">
      <img src={`${process.env.PUBLIC_URL}/${image}`} alt="mobile phone" />
      <div className="bar">
        <div className="text">{name}</div>
      </div>
      <div className="effect"></div>
    </div>
  );
}

export default Component;
