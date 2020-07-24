import React from "react";
import "./style.css";

function Component({ placeholder }) {
  return (
    <form className="search" method="GET" action="/products">
      <div className="inputContainer">
        <input type="text" placeholder={placeholder} name="description" />
      </div>
      <div className="searchContainer">
        <button className="button">Buscar</button>
      </div>
    </form>
  );
}

export default Component;
