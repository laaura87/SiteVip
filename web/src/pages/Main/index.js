import React, { useState, useEffect } from "react";
import "./style.css";

import { Carousel } from "react-bootstrap";

import Header from "../../components/Header";
import CardGrid from "../../components/CardGrid";
import Footer from "../../components/Footer";
import api from "../../services/api";
import WarningButton from "../../components/WarningButton";
import SuccessButton from "../../components/SuccessButton";

import { Container, GridContainerProducts } from "./styles.js";

function Main() {
  const [products, setProducts] = useState([]);
  const [buttonState, setButtonState] = useState([]);
  const [cardButtonName, setCardButtonName] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      await api
        .get(`/rand?filial=${sessionStorage.getItem("filial")}`, {
          headers: { "x-access-token": sessionStorage.getItem("token") },
        })
        .then((response) => {
          setProducts(response.data);
          setButtonState(response.data.map(() => ""));
          setCardButtonName(response.data.map(() => "Adicionar no Carrinho"));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    loadProducts();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Carousel>
          <Carousel.Item>
            <img src="mobile-phone.jpg" width={490} className="d-block w-100" />
            <Carousel.Caption>
              <h3>Celulares</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="laptop.jpg" className="d-block w-100" />
            <Carousel.Caption>
              <h3>Notebooks</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="tv.jpg" className="d-block w-100" />
            <Carousel.Caption>
              <h3>Televisão</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="acessories.jpg" className="d-block w-100" />
            <Carousel.Caption>
              <h3>Acessórios</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>

      <GridContainerProducts>
        {products.map((product, index) => {
          return (
            <CardGrid
              name={product.PROD_DESCRICAO}
              price={product.PROD_PRECO_VENDA}
              id={product.PROD_CODIGO}
              key={product.PROD_CODIGO}
              image={product.PROD_IMAG_NOME}
            />
          );
        })}
      </GridContainerProducts>

      <Footer />
    </>
  );
}

export default Main;
