import React from "react";
import "./style.css";

import DefaultButton from "../DefaultButton";

function Component() {
  return (
    <form className="search" method="GET" action="/products">
      <div className="inputContainer">
        <input type="text" placeholder="Pesquisar Produto" name="description" />
      </div>
      <div className="searchContainer">
        <DefaultButton text="Pesquisar" />
      </div>
    </form>
  );
}

export default Component;
