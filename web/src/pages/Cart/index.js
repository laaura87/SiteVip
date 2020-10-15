import React, { useState, useEffect } from "react";
import {
  FaCartPlus,
  FaWindowClose,
  FaShoppingCart,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

import {
  Container,
  CarEmpty,
  ContainerProducts,
  Grid,
  ContainerSub,
  Finish,
} from "./styles";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";

import api from "../../services/api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CartEmpty from "../../components/CartEmpty";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const toastId = React.useRef(null);

  // useEffect(() => {
  //   const loadProducts = async () => {
  //     api
  //       .get(
  //         `/cart?filial=${sessionStorage.getItem(
  //           "filial"
  //         )}&codigo=${sessionStorage.getItem("codigo")}`
  //       )
  //       .then((response) => {
  //         setCartProducts(response.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   loadProducts();
  // }, []);

  const loadProducts = () => {
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

  React.useEffect(loadProducts, []);

  async function handleDelete(prodCodigo) {
    await api
      .delete(
        `/cart/${sessionStorage.getItem("filial")}/${sessionStorage.getItem(
          "codigo"
        )}/${prodCodigo}`
      )
      .then(() => {
        if (!toast.isActive(toastId.current)) {
          toast.error("Produto removido com sucesso!", {
            position: "top-center",
            autoClose: 5000,
            closeOnClick: true,
            hideProgressBar: true,
            draggable: true,
            progress: undefined,
          });
        }

        loadProducts();
      })
      .catch((err) => {
        console.log(err);
        alert("Erro ao remover produto!");
      });
  }

  async function handleEdit(prodCodigo, value) {
    await api
      .put(
        `/cart/${sessionStorage.getItem("filial")}/${sessionStorage.getItem(
          "codigo"
        )}/${prodCodigo}`,
        {
          prodQtd: value,
        }
      )
      .then(loadProducts())
      .catch((err) => console.log(err));
  }

  //contando o subtotal
  let sub = 0;
  const subtotal = cartProducts.map((product) => {
    sub += product.PROD_PRECO_VENDA * product.PROD_QTD;
    return sub;
  });

  if (!cartProducts) {
  }

  if (cartProducts.length === 0) {
    return <CartEmpty />;
  }

  return (
    <>
      <Header />
      <Container>
        <Grid width="100%">
          <thead>
            <tr>
              <th width="50%">Produtos</th>
              <th>Valor Unitário</th>
              <th className="quantity-name">Quantidade</th>
              <th>Subtotal</th>
              <th>Excluir</th>
            </tr>
          </thead>

          <tbody>
            {cartProducts.map((product) => {
              return (
                <ContainerProducts>
                  <td width="50%" className="product-container">
                    <img src="https://via.placeholder.com/80" alt="" />
                    <p className="name-product">{product.PROD_DESCRICAO}</p>
                  </td>
                  <td>
                    <p>
                      {product.PROD_PRECO_VENDA.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </td>
                  <td align="center" className="center-product">
                    <div className="counter-product">
                      <span>
                        <FaMinus
                          size={14}
                          onClick={() =>
                            handleEdit(
                              product.PROD_CODIGO,
                              product.PROD_QTD - 1
                            )
                          }
                        />
                      </span>
                      <input type="text" value={product.PROD_QTD} />
                      <span>
                        <FaPlus
                          size={14}
                          onClick={() =>
                            handleEdit(
                              product.PROD_CODIGO,
                              product.PROD_QTD + 1
                            )
                          }
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>
                      {(
                        product.PROD_QTD * product.PROD_PRECO_VENDA
                      ).toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </td>
                  <td>
                    <FaWindowClose
                      color="red"
                      size={18}
                      onClick={() => handleDelete(product.PROD_CODIGO)}
                    />
                  </td>
                </ContainerProducts>
              );
            })}
          </tbody>
        </Grid>

        <ContainerSub>
          <div>
            <p>Subtotal: </p>
            <p>
              {sub.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </ContainerSub>

        <Finish>
          <p>Finalizar Pedido</p>
          <span>
            <FaShoppingCart />
          </span>
        </Finish>
      </Container>
      <Footer />
    </>
  );
}

export default Cart;
