import React from "react";
import { Container } from "./styles";
import { FaCartPlus } from "react-icons/fa";
function ButtonBuy() {
  return (
    <Container>
      <button>
        Adicionar ao carrinho{" "}
        <span>
          <FaCartPlus color="white" size={24} />
        </span>
      </button>
    </Container>
  );
}
export default ButtonBuy;
