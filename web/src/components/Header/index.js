import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import "./style.css";
import Cart from "../Cart";

function Component() {
  const [categoryHidden, setCategoryHidden] = useState("container");
  const [disabled, setDisabled] = useState("");
  const [cart, setCart] = useState("default");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      setCategories(
        await api.get("/categories").then((response) => {
          return response.data;
        })
      );
    };
    loadCategories();
  }, []);

  const handleProdutoHoverUp = () => {
    setCategoryHidden("animation");
  };

  const handleProdutoHoverDown = () => {
    setCategoryHidden("container");
  };

  const handleCartClick = () => {
    setDisabled("disabled");
    setCart("cart");
  };

  const disableCart = () => {
    setDisabled("");
    setCart("default");
  };

  return (
    <>
      <header>
        <div className={`header`}>
          <div className="headerContent clickable">
            <div className="logo">
              <Link to="/">
                <img
                  className="logo"
                  src={`${process.env.PUBLIC_URL}/images/vip_logo.png`}
                  alt="Logo"
                  width="120"
                  height="120"
                />
              </Link>
            </div>
            <div
              className={`produtos clickable`}
              onMouseOver={() => handleProdutoHoverUp()}
              onMouseOut={() => handleProdutoHoverDown()}
            >
              <Link to="/products?page=1">
                <p>PRODUTOS</p>
              </Link>
            </div>
            <div className="contato clickable">CONTATO</div>
            <div
              className="carrinho clickable"
              onClick={() => handleCartClick()}
            >
              CARRINHO
            </div>
            <div className="logout clickable">LOGOUT</div>
          </div>
        </div>
      </header>
      <div
        className={`${categoryHidden}`}
        onMouseOver={() => handleProdutoHoverUp()}
        onMouseOut={() => handleProdutoHoverDown()}
      >
        <div className="categoryContent">
          {/*categories.map((category, index) => {
            return (
              <div key={index}>
                <Link className="clickable">{category.SUB_GRP_DESCRICAO}</Link>
              </div>
            );
          })*/}
        </div>
      </div>
      <div className={disabled}></div>
      <div className={`${cart}`}>
        {/*<Cart disableCart={() => disableCart()} />*/}
      </div>
    </>
  );
}

export default Component;
