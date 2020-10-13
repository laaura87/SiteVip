import React from "react";
import { Container } from "./styles";
import { FaCartPlus } from "react-icons/fa";

import api from "../../services/api";

function ButtonBuy({ id }) {
  console.log(sessionStorage);
  //adicao ao carrinho (teste)
  async function insertItems(prodCodigo, value) {
    console.log("entra na funcao");
    await api
      .put(
        `/cart/${sessionStorage.getItem("filial")}/${sessionStorage.getItem(
          "codigo"
        )}/${prodCodigo}`,
        {
          prodQtd: value,
        }
      )
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
