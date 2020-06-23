import React, { useState } from "react";

import "./style.css";
import Cart from "../Cart";

function Component() {
  const [categoryHidden, setCategoryHidden] = useState("container");
  const [disabled, setDisabled] = useState("");
  const [cart, setCart] = useState("");

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
    setCart("");
  };

  return (
    <>
      <div
        className={`${categoryHidden}`}
        onMouseOver={() => handleProdutoHoverUp()}
        onMouseOut={() => handleProdutoHoverDown()}
      >
        <div className="headerContent"></div>
      </div>
      <header>
        <div className={`header`}>
          <div className="headerContent clickable">
            <div className="logo">
              <img
                className="logo"
                src={`${process.env.PUBLIC_URL}/images/vip_logo.png`}
                alt="Logo"
                width="120"
                height="120"
              />
            </div>
            <div
              className={`produtos clickable`}
              onMouseOver={() => handleProdutoHoverUp()}
              onMouseOut={() => handleProdutoHoverDown()}
            >
              <p>Produtos</p>
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

      <div className={disabled}></div>
      <div className={`${cart} default`}>
        <Cart disableCart={() => disableCart()} />
      </div>
    </>
  );
}

export default Component;
