import React from "react";

import "./style.css";

/**
 * <img
              className="logo"
              src={`${process.env.PUBLIC_URL}/images/vip_logo.png`}
              alt="Logo"
            />
 */

function Component() {
  return (
    <header>
      <div className="header">
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
          <div className="produtos clickable">Produtos</div>
          <div className="contato clickable">Contato</div>
          <div className="carrinho clickable">Carrinho</div>
          <div className="logout clickable">Logout</div>
        </div>
      </div>
      <div className="container">
        <div className="headerContent">
          <div className="test">1</div>
          <div className="test">2</div>
          <div className="test">3</div>
          <div className="test">4</div>
          <div className="test">5</div>
          <div className="test">6</div>
          <div className="test">7</div>
          <div className="test">8</div>
          <div className="test">9</div>
          <div className="test">10</div>
          <div className="test">11</div>
          <div className="test">12</div>
        </div>
      </div>
    </header>
  );
}

export default Component;
