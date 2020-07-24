import React from "react";
import "./style.css";

function Component() {
  return (
    <div className="warning">
      <div className="text">Falha ao adicionar no carrinho</div>
      <div className="sign">
        <lottie-player
          src="https://assets10.lottiefiles.com/packages/lf20_dVJMow.json"
          background="transparent"
          speed="1"
          style={{ width: 31, height: 31 }}
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>
  );
}

export default Component;
