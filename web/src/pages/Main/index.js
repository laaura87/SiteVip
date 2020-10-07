import React, { useState, useEffect } from "react";
import "./style.css";

import { Carousel } from "react-bootstrap";

import Header from "../../components/Header";
import CardGrid from "../../components/CardGrid";
import Footer from "../../components/Footer";
import api from "../../services/api";

import { Container, GridContainerProducts } from "./styles.js";

function Main() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      await api
        .get(`/rand?filial=${sessionStorage.getItem("filial")}`, {
          headers: { "x-access-token": sessionStorage.getItem("token") },
        })
        .then((response) => {
          setProducts(response.data);
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
            <img src="mobile-phone.jpg" alt="Celulares" />
            <Carousel.Caption>
              <h3>Celulares</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="laptop.jpg" alt="Notebooks" />
            <Carousel.Caption>
              <h3>Notebooks</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="tv.jpg" alt="Televisores" />
            <Carousel.Caption>
              <h3>Televisão</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="acessories.jpg" alt="Acessorios" />
            <Carousel.Caption>
              <h3>Acessórios</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>

      <GridContainerProducts>
        {products.map((product) => {
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
