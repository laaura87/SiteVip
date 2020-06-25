import React from "react";
import "./style.css";

import DefaultButton from "../DefaultButton";

function Component({ name, price }) {
  return (
    <div className="product">
      <img
        id="img"
        src={process.env.PUBLIC_URL + "/images/comp.png"}
        alt="produto"
        className="image"
      />
      <div className="name">{name}</div>
      <div className="price">{price}</div>
      <DefaultButton
        text="Adicionar no Carrinho"
        onClick={() => alert("huhuhuh")}
      />
    </div>
  );
}

export default Component;
