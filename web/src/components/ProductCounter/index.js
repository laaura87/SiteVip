import React from "react";
import "./style.css";
import { FaPlus, FaMinus } from "react-icons/fa";

function Component({
  value,
  addValue,
  subValue,
  plusButtonActive,
  minusButtonActive,
}) {
  return (
    <div className="counterContainer">
      <div className={minusButtonActive} onClick={subValue}>
        <FaMinus size={15} color="#475259" />
      </div>
      <div className="value">
        <div className="center">{value}</div>
      </div>
      <div className={plusButtonActive} onClick={addValue}>
        <FaPlus size={15} color="#475259" />
      </div>
    </div>
  );
}

export default Component;
