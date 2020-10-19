import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputNumber from "react-input-number";

import { FaWindowClose, FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import {
  Container,
  ContainerAll,
  ContainerProducts,
  Grid,
  ContainerSub,
  Finish,
} from "./styles";

import useAxios from '../../hooks/useAxios'
import api from "../../services/api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CartEmpty from "../../components/CartEmpty";
import Loading from "../../components/Loading";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);

  const toastId = React.useRef(null);


  const 


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
      .then(() => {
        loadProducts();
      })
      .catch((err) => console.log(err));
  }

  let sub = 0;
  const subtotal = cartProducts.map((product) => {
    sub += product.PROD_PRECO_VENDA * product.PROD_QTD;
    return sub;
  });

  if (!cartProducts) {
    return (
      <>
        <Header />
        <Loading />
        <Footer />
      </>
    );
  } else if (cartProducts.length == 0) {
    return <CartEmpty />;
  }

  return (
    <>
      <Header />
      <ContainerAll>
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
              {cartProducts.map((product, index) => {
                return (
                  <ContainerProducts>
                    <td width="50%" className="product-container">
                      <Link to={`/products/${product.PROD_CODIGO}`}>
                        {product.PROD_IMAG[0] == undefined ? (
                          <img
                            src={
                              process.env.PUBLIC_URL + "/images/no-image.png"
                            }
                            alt={product.PROD_DESCRICAO.slice(0, 18)}
                          />
                        ) : (
                          <img
                            src={`http://187.84.80.162:8082/imagens/${product.PROD_IMAG[0].PROD_IMAG_NOME}`}
                            alt={product.PROD_DESCRICAO.slice(0, 18)}
                          />
                        )}
                        <p className="name-product">{product.PROD_DESCRICAO}</p>
                      </Link>
                      <Link to={`/products/${product.PROD_CODIGO}`}></Link>
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
                          {product.PROD_QTD > 1 && (
                            <FaMinus
                              size={14}
                              onClick={() =>
                                handleEdit(
                                  product.PROD_CODIGO,
                                  product.PROD_QTD - 1
                                )
                              }
                            />
                          )}

                          {product.PROD_QTD == 1 && (
                            <FaMinus size={14} className="not-available" />
                          )}
                        </span>
                        <InputNumber
                          max={product.PROD_QTD_ATUAL}
                          value={product.PROD_QTD}
                        />

                        <span>
                          {product.PROD_QTD + 1 > product.PROD_QTD_ATUAL && (
                            <FaPlus size={14} className="not-available" />
                          )}
                          {product.PROD_QTD + 1 <= product.PROD_QTD_ATUAL && (
                            <FaPlus
                              size={14}
                              onClick={() =>
                                handleEdit(
                                  product.PROD_CODIGO,
                                  product.PROD_QTD + 1
                                )
                              }
                            />
                          )}
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
      </ContainerAll>

      <Footer />
    </>
  );
}

export default Cart;
