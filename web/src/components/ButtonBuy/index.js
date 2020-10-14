import React from "react";
import { Container } from "./styles";
import { FaCartPlus } from "react-icons/fa";

import api from "../../services/api";

function ButtonBuy({ id }) {
  async function insertItems(prodCodigo, value) {
    await api
      .post("/cart", {
        prodQtd: value,
        filial: sessionStorage.getItem("filial"),
        codigo: sessionStorage.getItem("codigo"),
        prodCodigo: prodCodigo,
      })
      .then(() => {
        alert("Item adicionado com sucesso!");
      })
      .catch((err) => {
        console.log(err);
        alert("Erro ao carregar carrinho");
      });
  }

  return (
    <Container>
      <button onClick={() => insertItems(id, 1)}>
        <p>Adicionar ao carrinho </p>
        <span>
          <FaCartPlus color="white" size={24} />
        </span>
      </button>
    </Container>
  );
}
export default ButtonBuy;
