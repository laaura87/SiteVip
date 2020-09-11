import React, { useState, useEffect } from "react";
import "./style.css";
import ProductRow from "../ProductRow";
import DefaultButton from "../DefaultButton";
import { FaWindowClose } from "react-icons/fa";
import api from "../../services/api";

function Component({ disableCart }) {
  const [counter, setCounter] = useState([]);
  const [products, setProducts] = useState([]);
  const [plusActive, setPlusActive] = useState([]);
  const [minusActive, setMinusActive] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const handlePlusClick = async (index) => {
    let shallowCopy = [...plusActive];
    shallowCopy = shallowCopy.map((item, i) =>
      i === index ? "plusButtonDisabled" : item
    );
    setPlusActive(shallowCopy);
    const addOne = counter[index] + 1;
    setCounter((state) =>
      state.map((item, i) => (index === i ? addOne : item))
    );
    await handleUpdate(products[index].PROD_CODIGO, addOne);
    shallowCopy = shallowCopy.map((item, i) =>
      i === index ? "plusButton" : item
    );
    setPlusActive(shallowCopy);
  };

  const handleMinusClick = async (index) => {
    const subOne = counter[index] - 1;
    setCounter((state) =>
      state.map((item, i) => (index === i ? (item > 1 ? subOne : item) : item))
    );
    await handleUpdate(products[index].PROD_CODIGO, subOne);
  };

  const handleUpdate = async (prodCodigo, value) => {
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
        setTrigger(!trigger);
      })
      .catch((err) => {
        console.log(err);
        alert("Erro ao carregar carrinho");
      });
  };

  const handleRemove = async (prodCodigo) => {
    let shallowCopy = [...products];
    shallowCopy = shallowCopy.filter(
      (item) => item?.PROD_CODIGO === prodCodigo
    );
    setProducts(shallowCopy);
    await api
      .delete(
        `/cart/${sessionStorage.getItem("filial")}/${sessionStorage.getItem(
          "codigo"
        )}/${prodCodigo}`
      )
      .then(() => {
        setTrigger(!trigger);
      })
      .catch((err) => {
        console.log(err);
        alert("Erro ao remover Produto");
      });
  };

  useEffect(() => {
    const loadProducts = async () => {
      api
        .get(
          `/cart?filial=${sessionStorage.getItem(
            "filial"
          )}&codigo=${sessionStorage.getItem("codigo")}`
        )
        .then((response) => {
          setProducts(response.data);
          setCounter(response.data.map((product) => product.PROD_QTD));
          setPlusActive(response.data.map(() => "plusButton"));
          setMinusActive(response.data.map(() => "minusButton"));
        })
        .catch((err) => {
          console.log(err);
          alert("Deu merda, te vira aí boy");
        });
    };
    loadProducts();
  }, [trigger]);
  return (
    <>
      <div className="closeContainer">
        <div className="close" onClick={disableCart}>
          <FaWindowClose size={24} color="#8C2A32" opacity={1} />
        </div>
      </div>
      <div className="cartBox">
        {console.log(products)}
        {products?.map((product, index) => {
          return (
            <ProductRow
              value={counter}
              plusAction={() => {
                if (plusActive[index] === "plusButton") {
                  handlePlusClick(index);
                }
              }}
              minusAction={() => {
                if (minusActive[index] === "minusButton") {
                  handleMinusClick(index);
                }
              }}
              productName={product.PROD_DESCRICAO}
              image={product.PROD_IMAG}
              price={product.PROD_PRECO_VENDA * counter[index]}
              quantity={counter[index]}
              key={product.PROD_CODIGO}
              onRemove={() => {
                handleRemove(product.PROD_CODIGO);
              }}
              plusButtonActive={plusActive[index]}
              minusButtonActive={minusActive[index]}
            />
          );
        })}

        <div className="totalBox">
          <div className="content">
            <p>Subtotal</p>
            <p>
              <strong>R$20,00</strong>
            </p>
          </div>
        </div>
        <div className="buttonContainer">
          <DefaultButton
            text="Finaliza Compra"
            onClick={() => alert("aaaaaa")}
          />
        </div>
      </div>
    </>
  );
}

export default Component;
