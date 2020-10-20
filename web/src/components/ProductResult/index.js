import React from "react";

import { Container } from "./styles";

function ProductResult({ name, picture, quantity, id, price }) {
  return (
    <Container>
      <div>
        <img src={picture} alt="" />
      </div>
      <div>
        <p>{name}</p>
      </div>
      <div>
        <p>{price}</p>
      </div>
    </Container>
  );
}

export default ProductResult;
