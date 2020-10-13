import React, { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { Container, CarEmpty, ContainerProducts } from "./styles";

import { Link } from "react-router-dom";

import api from "../../services/api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      api
        .get(
          `/cart?filial=${sessionStorage.getItem(
            "filial"
          )}&codigo=${sessionStorage.getItem("codigo")}`
        )
        .then((response) => {
          setCartProducts(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    loadProducts();
  }, []);

  if (cartProducts.length === 0) {
    return (
      <>
        <Header />
        <CarEmpty>
          <h1>
            {" "}
            <FaCartPlus size={20} color="white" />
            Produtos adicionados ao carrinho
          </h1>
          <div>
            <p>O carrinho está vazio :(</p>
            <p> Deseja olhar outros produtos?</p>
            <Link to="/home">
              <span>
                <FaCartPlus size={20} color="white" /> Continuar comprando
              </span>
            </Link>
          </div>
        </CarEmpty>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container>
        {cartProducts.map((product) => {
          return (
            <ContainerProducts>
              <img src="https://via.placeholder.com/80" alt="" />
              <p className="name-product">{product.PROD_DESCRICAO}</p>
              <p>
                {product.PROD_PRECO_VENDA.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </ContainerProducts>
          );
        })}
      </Container>
      <Footer />
    </>
  );
}

export default Cart;
