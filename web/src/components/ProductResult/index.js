import React from "react";

import { Container, ContainerBody } from "./styles";
import ButtonBuy from "../ButtonBuy";

function ProductResult({ name, picture, quantity, id, price }) {
  return (
    <ContainerBody>
      <Container>
        <div>
          <img src={picture} alt="" />
        </div>
        <div>
          <p>{name}</p>
        </div>
        <div className="buy">
          <p>{price}</p>
          <ButtonBuy id={id} />
        </div>
      </Container>
    </ContainerBody>
  );
}

export default ProductResult;
