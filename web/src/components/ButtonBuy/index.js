import React from "react";
import { Container } from "./styles";
import { FaCartPlus } from "react-icons/fa";
function ButtonBuy() {
  return (
    <Container>
      <button>
        <p>Adicionar ao carrinho </p>
        <span>
          <FaCartPlus color="white" size={24} />
        </span>
      </button>
    </Container>
  );
}
export default ButtonBuy;
