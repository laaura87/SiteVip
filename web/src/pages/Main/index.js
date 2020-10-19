import React from "react";

import { Carousel } from "react-bootstrap";
import { useAxios } from "../../hooks/useAxios";

import Header from "../../components/Header";
import CardGrid from "../../components/CardGrid";
import Footer from "../../components/Footer";
import MenuDesktop from "../../components/MenuDesktop";

import {
  Container,
  GridContainerProducts,
  EffectText,
  ContainerBody,
  LeftSection,
  RightSection,
} from "./styles.js";

function Main() {
  const { data } = useAxios(
    `/rand?filial=${sessionStorage.getItem("filial")}`,
    {
      headers: { "x-access-token": sessionStorage.getItem("token") },
    }
  );

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
                <img
                  src="https://via.placeholder.com/600x300"
                  alt="Multilaser Xpad"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="https://via.placeholder.com/600x300"
                  alt="Multilaser Escova Eletrica"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="https://via.placeholder.com/600x300"
                  alt="Monitor Acer 23.6pol"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="https://via.placeholder.com/600x300"
                  alt="OEX Cooler fan"
                />
              </Carousel.Item>
            </Carousel>
          </Container>
          <EffectText className="effect-text">
            <h1>As melhores ofertas</h1>
          </EffectText>
          <GridContainerProducts>
            {data?.map((product) => {
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
