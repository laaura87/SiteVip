import React, { useState } from "react";
import "./style.css";
import DefaultButton from "../../components/DefaultButton";
import InputMask from "react-input-mask";
import api from "../../services/api";
import { onSignIn } from "../../services/auth";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const result = await onSignIn(login, password);
    if (result) {
      window.location.href = "/home";
    } else {
      alert("Login ou senha inválidos. Tente novamente");
    }
  };

  return (
    <div className="full-screen">
      <div className="login-block">
        <img
          className="login-img"
          alt="login"
          src={`${process.env.PUBLIC_URL}/images/login-img.jpg`}
        />
        <div className="login-img-banner"></div>
        <div className="input-block">
          <img
            className="login-page-logo"
            alt="logo-login"
            src={`${process.env.PUBLIC_URL}/images/vip_logo.png`}
          />
          <div className="block">
            <label to="clieCpfCnpj">CNPJ:</label>
            <InputMask
              mask={"99.999.999/9999-99"}
              className="input-login"
              maskChar={null}
              value={login}
              onChange={(event) => {
                setLogin(event.target.value);
              }}
            />
          </div>

          <div className="block">
            <label to="senha">Senha:</label>
            <input
              className="input-login"
              type="password"
              name="senha"
              id="senha"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div className="login-button-container">
            <DefaultButton
              text="Login"
              onClick={() => {
                handleLogin();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
