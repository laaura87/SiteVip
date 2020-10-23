import React from "react";

import {
  DetailsProducts,
  ContainerProduct,
  RelatedProducts,
  Container,
} from "./styles";

import ProductUnavailable from "../../components/ProductUnavailable";
import ProductDisp from "../../components/ProductDisp";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ButtonBuy from "../../components/ButtonBuy";
import ButtonUnavailable from "../../components/ButtonUnavailable";

import CardGrid from "../../components/CardGrid";

import { useAxios } from "../../hooks/useAxios";

function Detail({ match: { params } }) {
  const { data } = useAxios(
    `/products/${params.prodCodigo}?filial=${sessionStorage.getItem("filial")}`,
    {
      headers: { "x-access-token": sessionStorage.getItem("token") },
    },
    { revalidateOnFocus: false }
  );

  console.log(data);
  return (
    <>
      <Header />
      <Container>
        <ContainerProduct>
          <div className="img-container">
            {data?.product?.PROD_IMAG[0] === undefined ? (
              <img
                src={process.env.PUBLIC_URL + "/images/no-image.png"}
                alt="Sem Imagem"
                className="image"
              />
            ) : (
              <img
                src={`http://187.84.80.162:8082/imagens/${data?.product?.PROD_IMAG[0].PROD_IMAG_NOME}`}
                alt="Imagem produto"
                className="image"
              />
            )}
          </div>

          <DetailsProducts>
            <h1>{data?.product?.PROD_DESCRICAO}</h1>
            <div>
              {data?.product?.PROD_QTD_ATUAL > 0 && <ProductDisp />}

              {data?.product?.PROD_QTD_ATUAL === 0 && <ProductUnavailable />}

              <div className="price">
                {data?.product?.PROD_PRECO_VENDA?.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
                <p>
                  Ou até em 10x de{" "}
                  {(data?.product?.PROD_PRECO_VENDA / 10).toLocaleString(
                    "pt-br",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}{" "}
                  no cartão
                </p>
              </div>

              <div className="buy-button">
                {data?.product?.PROD_QTD_ATUAL > 0 && (
                  <ButtonBuy id={data?.PROD_CODIGO} />
                )}

                {data?.product?.PROD_QTD_ATUAL === 0 && <ButtonUnavailable />}
              </div>
            </div>
          </DetailsProducts>
        </ContainerProduct>

        <RelatedProducts>
          <h1>Produtos relacionados</h1>
          <div className="layout-grid">
            {data?.relatedProducts?.map((relatedProduct) => {
              return (
                <CardGrid
                  key={relatedProduct.PROD_CODIGO}
                  id={relatedProduct.PROD_CODIGO}
                  name={relatedProduct.PROD_DESCRICAO}
                  price={relatedProduct.PROD_PRECO_VENDA}
                  image={relatedProduct.PROD_IMAG_NOME}
                  quantity={relatedProduct.PROD_QTD_ATUAL}
                />
              );
            })}
          </div>
        </RelatedProducts>
      </Container>
      <Footer />
    </>
  );
}

export default Detail;
