import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { onSignOut } from "../../services/auth";

import "./style.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import Cart from "../Cart";
import cn from "classnames";

function Component() {
  const [disabled, setDisabled] = useState("");
  const [cart, setCart] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      setCategories(
        await api
          .get(`/categories?filial=${sessionStorage.getItem("filial")}`, {
            headers: { "x-access-token": sessionStorage.getItem("token") },
          })
          .then((response) => {
            return response.data;
          })
      );
    };
    loadCategories();
  }, []);

  const handleCartClick = () => {
    setDisabled("disabled");
    setCart(true);
    document.body.classList.add("no-scroll");
  };

  const disableCart = () => {
    setDisabled("");
    setCart(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <>
      <header>
        <div className={`header`}>
          <div className="headerContent clickable">
            <div className="logo">
              <Link to="/home">
                <img
                  className="logo"
                  src={`${process.env.PUBLIC_URL}/images/vip_logo.png`}
                  alt="Logo"
                  width="120"
                  height="120"
                />
              </Link>
            </div>
            <div className={`produtos clickable`}>
              <Link to="/products?page=1">
                <p>PRODUTOS</p>
              </Link>
              <div className="categories">
                {categories.map((category, index) => {
                  return (
                    <p key={index}>
                      <strong>{category.GRP_DESCRICAO}</strong>
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="contato clickable">CONTATO</div>
            <div
              className="carrinho clickable"
              onClick={() => handleCartClick()}
            >
              CARRINHO
            </div>
            <div
              className="logout clickable"
              onClick={() => {
                onSignOut();
                window.location.href = "/";
              }}
            >
              LOGOUT
            </div>
          </div>
        </div>
      </header>
      {/*<div
        className={`${categoryHidden}`}
        onMouseOver={() => handleProdutoHoverUp()}
        onMouseOut={() => handleProdutoHoverDown()}
      >*/}

      {/*</div>*/}
      <div className={disabled}></div>
      <div className={cn({ cart: true, active: cart })}>
        <Cart disableCart={() => disableCart()} />
      </div>
    </>
  );
}

export default Component;
