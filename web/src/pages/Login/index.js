import React, { useState, useEffect } from "react";
import "./style.css";
import DefaultButton from "../../components/DefaultButton";
import InputMask from "react-input-mask";
import api from "../../services/api";
import { onSignIn } from "../../services/auth";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [filiais, setFiliais] = useState([]);
  const [selectOption, setSelectedOption] = useState("1");

  const handleLogin = async () => {
    const result = await onSignIn(login, password);
    if (result) {
      sessionStorage.setItem("filial", selectOption);
      window.location.href = "/home";
    } else {
      alert("Login ou senha inválidos. Tente novamente");
    }
  };

  useEffect(() => {
    const loadFiliais = () => {
      api
        .get("/filial")
        .then((response) => {
          setFiliais(response.data);
        })
        .catch((err) => {
          alert("Serviço Indisponível no momento");
          console.log(err);
        });
    };
    loadFiliais();
  });

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
          <div className="block">
            <label to="filial">Filial:</label>
            <select
              name="filial"
              id="filial"
              className="input-login"
              onChange={(event) => setSelectedOption(event.target.value)}
            >
              {filiais.map((filial, index) => {
                return (
                  <option value={filial.FIL_CODIGO} key={index}>
                    {filial.FIL_NOME}
                  </option>
                );
              })}
            </select>
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
