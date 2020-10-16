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
import { useAxios } from "../../hooks/useAxios";

function Main() {
  const [products, setProducts] = useState([]);

  const { data } = useAxios(
    `/rand?filial=${sessionStorage.getItem("filial")}`,
    {
      headers: { "x-access-token": sessionStorage.getItem("token") },
    }
  );

  console.log(data);

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
                <img src="banner1.png" alt="Multilaser Xpad" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="banner2.png" alt="Multilaser Escova Eletrica" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="banner3.png" alt="Monitor Acer 23.6pol" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="banner4.png" alt="OEX Cooler fan" />
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
                  quantity={product.PROD_QTD_ATUAL}
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
