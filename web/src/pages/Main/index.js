import React, { useState, useEffect } from "react";

import { Carousel } from "react-bootstrap";

import Header from "../../components/Header";
import CardGrid from "../../components/CardGrid";
import Footer from "../../components/Footer";
import MenuDesktop from "../../components/MenuDesktop";

import api from "../../services/api";

import {
  Container,
  GridContainerProducts,
  EffectText,
  ContainerBody,
  LeftSection,
  RightSection,
} from "./styles.js";

function Main() {
  const [products, setProducts] = useState([]);

  //verificar os erros em relacao a responsividade :)

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

      <ContainerBody>
        <LeftSection>
          <MenuDesktop />
        </LeftSection>
        <RightSection>
          <Container>
            <Carousel>
              <Carousel.Item>
                <img src="mobile-phone.jpg" alt="Celulares" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="laptop.jpg" alt="Notebooks" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="tv.jpg" alt="Televisores" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="acessories.jpg" alt="Acessorios" />
              </Carousel.Item>
            </Carousel>
          </Container>
          <EffectText className="effect-text">
            <h1>As melhores ofertas</h1>
          </EffectText>
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
        </RightSection>
      </ContainerBody>

      <Footer />
    </>
  );
}

export default Main;
