import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";

import { Container, NoResult } from "./styles";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
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

  if (!data) {
    return (
      <>
        <Header />
        <Container>
          <div className="title-results">
            <h1>Resultados para '{name}'</h1>
            <p>(total de produtos: {data?.count})</p>
          </div>
          <Loading />
        </Container>
        <Footer />
      </>
    );
  }
  if (data.count == 0) {
    return (
      <>
        <Header />
        <NoResult>
          <div className="no-results">
            <h1>Não encontramos resultados para '{name}' :(</h1>
          </div>
        </NoResult>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Header />
      <Container>
        <div className="title-results">
          <h1>Resultados para '{name}'</h1>
          <p>(total de produtos: {data?.count})</p>
        </div>
        <div>
          {data?.result.map((product) => (
            <ProductResult
              name={product.PROD_DESCRICAO}
              picture={product.PROD_IMAG_NOME}
              quantity={product.PROD_QTD_ATUAL}
              id={product.PROD_CODIGO}
              price={product.PROD_PRECO_VENDA.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            />
          ))}
        </div>
        <Pagination pages={data?.pages} activePage={page} onChange={setPage} />
      </Container>
      <Footer />
    </>
  );
}

export default SearchResult;
