import React, { useState, useEffect } from "react";
import "./style.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import SearchBox from "../../components/SearchBox";
import DefaultButton from "../../components/DefaultButton";
import WarningButton from "../../components/WarningButton";
import SuccessButton from "../../components/SuccessButton";

import api from "../../services/api";

function Products({ history }) {
  const query = new URLSearchParams(window.location.search);
  const description = query.get("description") || null;
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(query.get("page") || "1");
  const [buttonState, setButtonState] = useState([]);
  const [cardButtonName, setCardButtonName] = useState([]);

  const handleButtonclick = async (index, prodCodigo) => {
    await api
      .post(
        "/cart",
        {
          filial: sessionStorage.getItem("filial"),
          codigo: sessionStorage.getItem("codigo"),
          prodCodigo,
          prodQtd: 1,
        },
        {
          headers: { "x-access-token": sessionStorage.getItem("token") },
        }
      )
      .then((response) => {
        if (response.data) {
          setButtonState((state) =>
            state.map((item, i) => (index === i ? "success" : item))
          );
          setCardButtonName((state) =>
            state.map((item, i) => (index === i ? <SuccessButton /> : item))
          );
        } else {
          setButtonState((state) =>
            state.map((item, i) => (index === i ? "warning" : item))
          );
          setCardButtonName((state) =>
            state.map((item, i) => (index === i ? <WarningButton /> : item))
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setButtonState((state) =>
          state.map((item, i) => (index === i ? "warning" : item))
        );
        setCardButtonName((state) =>
          state.map((item, i) => (index === i ? <WarningButton /> : item))
        );
      });
  };

  useEffect(() => {
    const loadProducts = async () => {
      setPage(page);
      await api
        .get(
          `/products?page=${page}&description=${
            description || ""
          }&filial=${sessionStorage.getItem("filial")}`,
          {
            headers: { "x-access-token": sessionStorage.getItem("token") },
          }
        )
        .then((response) => {
          setProducts(response.data);
          setButtonState(response.data.map(() => ""));
          setCardButtonName(response.data.map(() => "Adicionar no Carrinho"));
          return response.data;
        });

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
        {products.map((product, index) => {
          return (
            <Card
              key={product.PROD_CODIGO}
              id={product.PROD_CODIGO}
              name={product.PROD_DESCRICAO}
              price={product.PROD_PRECO_VENDA}
              image={product.PROD_IMAG_NOME}
              buttonClass={buttonState[index]}
              buttonClick={() => {
                handleButtonclick(index, product.PROD_CODIGO);
              }}
              buttonName={cardButtonName[index]}
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
