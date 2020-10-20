import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";

import { Container } from "./styles";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Pagination from "../../components/Pagination";
import ProductResult from "../../components/ProductResult";

function SearchResult() {
  const [page, setPage] = useState(1);

  const { name } = useParams();

  const { data } = useAxios(
    `/search?filial=${sessionStorage.getItem(
      "filial"
    )}&name=${name.toUpperCase()}&page=${page}`,
    {
      headers: { "x-access-token": sessionStorage.getItem("token") },
    }
  );
  console.log(data);
  return (
    <>
      <Header />
      <Container>
        <div className="title-results">
          <h1>Resultados para '{name}'</h1>
        </div>
        <div>
          {data?.data.map((product) => (
            <ProductResult
              name={product.PROD_DESCRICAO}
              picture={"https://via.placeholder.com/80"}
              quantity={product.PROD_QTD_ATUAL}
              id={product.PROD_CODIGO}
              price={product.PROD_PRECO_VENDA.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            />
          ))}
        </div>
        <Pagination
          pages={data?.pagination.currentPage}
          activePage={page}
          onChange={setPage}
        />
      </Container>
      <Footer />
    </>
  );
}

export default SearchResult;
