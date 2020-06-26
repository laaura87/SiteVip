import React from "react";
import "./style.css";

import DefaultButton from "../DefaultButton";

function Component({ name, price, image }) {
  return (
    <div className="product">
      {image ? (
        <img
          id="img"
          src={"http://187.84.80.162/imagens/" + image}
          alt="produto"
          className="image"
        />
      ) : (
        <img
          id="img"
          src={process.env.PUBLIC_URL + "/images/no-image.png"}
          alt="produto"
          className="image"
        />
      )}
      <div className="name">{name}</div>
      <div className="price">
        {price.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
      </div>
      <DefaultButton
        text="Adicionar no Carrinho"
        onClick={() => alert("huhuhuh")}
      />
    </div>
  );
}

export default Component;
