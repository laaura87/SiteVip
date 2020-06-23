import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./style.css";
import Cart from "../Cart";

function Component() {
  const [categoryHidden, setCategoryHidden] = useState("container");
  const [disabled, setDisabled] = useState("");
  const [cart, setCart] = useState("default");

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
              <Link to="/products">
                <p>Produtos</p>
              </Link>
            </div>
            <div className="contato clickable">Contato</div>
            <div
              className="carrinho clickable"
              onClick={() => handleCartClick()}
            >
              Carrinho
            </div>
            <div className="logout clickable">Logout</div>
          </div>
        </div>
      </header>
      <div
        className={`${categoryHidden}`}
        onMouseOver={() => handleProdutoHoverUp()}
        onMouseOut={() => handleProdutoHoverDown()}
      >
        <div className="categoryContent">
          <div>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
          </div>
          <div>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
          </div>
          <div>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
          </div>
          <div>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
          </div>
          <div>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
          </div>
          <div>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
            <p>Computadores</p>
          </div>
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
