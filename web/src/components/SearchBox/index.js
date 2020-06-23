import React from "react";
import "./style.css";

import DefaultButton from "../DefaultButton";

function Component() {
  return (
    <form className="search">
      <div className="inputContainer">
        <input type="text" placeholder="Pesquisar Produto" />
      </div>
      <div className="searchContainer">
        <DefaultButton text="Pesquisar" />
      </div>
    </form>
  );
}

export default Component;
