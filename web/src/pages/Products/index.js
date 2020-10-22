import React, { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductResult from "../../components/ProductResult";
import Loading from "../../components/Loading";

import { Container } from "./styles";

import { useAxios } from "../../hooks/useAxios";

function Products({ location }) {
  const query = new URLSearchParams(location.search);

  const categories = query.get("category") || "";
  const [page, setPage] = useState(1);

  const { data, mutate } = useAxios(
    `/products/category?filial=${sessionStorage.getItem(
      "filial"
    )}&category=${categories}&page=${page}`
  );

  function handleChange(event, value) {
    setPage(value);
  }

  if (!data) {
    return (
      <>
        <Header />
        <Container>
          <div className="title-results">
            <div>
              <h1>{categories}</h1>
              <p>({data?.count} items)</p>
            </div>
            <div>
              <select name="quantity-products">
                <option value="30">Ordem alfabética </option>
                <option value="10" selected>
                  Maior valor
                </option>
                <option value="15">Menor valor</option>
              </select>
              <select name="quantity-products">
                <option value="10" selected>
                  10 itens por página
                </option>
                <option value="15">15 itens por página</option>
                <option value="30">30 itens por página</option>
              </select>
            </div>
          </div>
          <Loading />
          <div className="root-data-fetch">
            <Pagination
              count={data?.pages}
              page={page}
              onChange={handleChange}
            />
          </div>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <div className="title-results">
          <div>
            <h1>{categories}</h1>
            <p>({data?.count} items)</p>
          </div>
          <div>
            <select name="quantity-products">
              <option value="10" selected>
                10 itens por página
              </option>
              <option value="15">15 itens por página</option>
              <option value="30">30 itens por página</option>
            </select>
          </div>
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
        <div className="root">
          <Pagination count={data?.pages} page={page} onChange={handleChange} />
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default Products;
