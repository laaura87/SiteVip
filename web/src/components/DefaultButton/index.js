import React from "react";
import "./style.css";

function Component({ text, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
}

export default Component;
