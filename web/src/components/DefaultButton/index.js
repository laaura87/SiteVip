import React from "react";
import "./style.css";

function Component({ text, onClick, className }) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default Component;
