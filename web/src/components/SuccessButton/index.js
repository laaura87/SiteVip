import React from "react";
import "./style.css";

function Component() {
  return (
    <div className="box-success">
      <div className="text">Adicionado no carrinho</div>
      <div className="sign">
        <lottie-player
          src="https://assets5.lottiefiles.com/packages/lf20_34bOEP.json"
          background="transparent"
          speed="1"
          style={{ width: 31, height: 31 }}
          autoplay
        ></lottie-player>
      </div>
    </div>
  );
}

export default Component;
