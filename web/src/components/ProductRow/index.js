import React from "react";
import "./style.css";
import ProductCounter from "../ProductCounter";

function Component({ value, plusAction, minusAction }) {
  return (
    <div className="productRow">
      <img
        className="productImage"
        src={process.env.PUBLIC_URL + "/images/computer.jpg"}
        alt="produto"
      />
      <div className="quantity">
        <ProductCounter
          value={value}
          addValue={plusAction}
          subValue={minusAction}
        />
      </div>
      <div className="price">R$20,00</div>
    </div>
  );
}

export default Component;
