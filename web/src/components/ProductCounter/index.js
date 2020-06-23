import React from "react";
import "./style.css";

function Component({ value, addValue, subValue }) {
  return (
    <div className="counterContainer" onClick={addValue}>
      <div className="plusButton" onClick={addValue}>
        +
      </div>
      <div className="value">{value}</div>
      <div
        className="minusButton"
        onClick={() => {
          subValue();
        }}
      >
        -
      </div>
    </div>
  );
}

export default Component;
