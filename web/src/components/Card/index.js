import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

import DefaultButton from "../DefaultButton";

function Component({ name, price, image, id }) {
  return (
    <div className="product">
      {image ? (
        <Link to={`/products/${id}`}>
          <img
            id="img"
            src={"http://187.84.80.162:8082/imagens/" + image}
            alt="produto"
            className="image"
          />
        </Link>
      ) : (
        <Link to={`/products/${id}`}>
          <img
            id="img"
            src={process.env.PUBLIC_URL + "/images/no-image.png"}
            alt="produto"
            className="image"
          />
        </Link>
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
