import React from "react";
import "./style.css";

function Component({ value, addValue, subValue }) {
  return (
    <div className="counterContainer">
      <div className="plusButton" onClick={subValue}>
        -
      </div>
      <div className="value">
        <div className="center">{value}</div>
      </div>
      <div className="minusButton" onClick={addValue}>
        +
      </div>
    </div>
  );
}

export default Component;
