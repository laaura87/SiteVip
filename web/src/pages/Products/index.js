import React, { useState, useEffect } from "react";
import "./style.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import SearchBox from "../../components/SearchBox";
import DefaultButton from "../../components/DefaultButton";

import api from "../../services/api";

function Products({ history }) {
  const query = new URLSearchParams(window.location.search);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(query.get("page") || "1");
  const [description, setDescription] = useState(
    query.get("description") || null
  );

  useEffect(() => {
    const loadProducts = async () => {
      setPage(page);
      const products = await api
        .get(`/products?page=${page}&description=${description || ""}`, {
          headers: { "x-access-token": sessionStorage.getItem("token") },
        })
        .then((response) => {
          return response.data;
        });

      setProducts(products);
      window.scrollTo(0, 0);
    };
    loadProducts();
  }, [page, description]);

  const nextPage = () => {
    let search;
    description
      ? (search = `?page=${(
          parseInt(page) + 1
        ).toString()}&description=${description}`)
      : (search = `?page=${(parseInt(page) + 1).toString()}`);
    history.push({
      pathname: "/products",
      search,
    });
    setPage((parseInt(page) + 1).toString());
  };

  const previousPage = () => {
    if (parseInt(page) === 1) {
      //do nothing
    } else {
      let search;
      description
        ? (search = `?page=${(
            parseInt(page) - 1
          ).toString()}&description=${description}`)
        : (search = `?page=${(parseInt(page) - 1).toString()}`);
      history.push({
        pathname: "/products",
        search,
      });
      setPage((parseInt(page) - 1).toString());
    }
  };

  return (
    <>
      <Header />
      <SearchBox />
      <div className="bodyContent">
        {products.map((product) => {
          return (
            <Card
              key={product.PROD_CODIGO}
              id={product.PROD_CODIGO}
              name={product.PROD_DESCRICAO}
              price={product.PROD_PRECO_VENDA}
              image={product.PROD_IMAG_NOME}
            />
          );
        })}
      </div>
      <div className="buttonBox">
        <div className="prev">
          <DefaultButton text="Anterior" onClick={() => previousPage()} />
        </div>
        <div className="prox">
          <DefaultButton text="Próximo" onClick={() => nextPage()} />
        </div>
      </div>
      <div className="space"></div>
      <Footer />
    </>
  );
}

export default Products;
