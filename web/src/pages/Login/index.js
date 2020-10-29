import React, { useState, useEffect } from "react";

import InputMask from "react-input-mask";
import api from "../../services/api";

import {
  Container,
  ContainerBody,
  Inputs,
  InputPassword,
  InputCnpj,
  SelectTypeUser,
  FilialOption,
  LoginButton,
  ContainerLogin,
} from "./styles";

import { onSignIn } from "../../services/auth";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [filiais, setFiliais] = useState([]);
  const [selectOption, setSelectedOption] = useState("1");

  const [user, setUser] = useState(false);
  const [enterprise, setEnterprise] = useState(true);

  const handleLogin = async () => {
    const result = await onSignIn(login, password);
    if (result) {
      sessionStorage.setItem("filial", selectOption);
      window.location.href = "/";
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
    <>
      <Container>
        <ContainerBody>
          <div className="img-container">
            <img src="/images/vip_logo.png" alt="Logo VIP" />
          </div>
          <SelectTypeUser>
            <div
              className={`${user && !enterprise ? "active" : ""}`}
              onClick={() => {
                setUser(true);
                setEnterprise(false);
              }}
            >
              Usuário
            </div>
            <div
              className={`multiPayment ${enterprise && !user ? "active" : ""}`}
              onClick={() => {
                setEnterprise(true);
                setUser(false);
              }}
            >
              Fornecedor
            </div>
          </SelectTypeUser>

          <Inputs>
            {user && (
              <ContainerLogin>
                <InputCnpj>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="jose@exemplo.com"
                  />
                </InputCnpj>
                <InputPassword>
                  <label>Senha:</label>
                  <input className="w-filial" type="password" name="senha" />
                </InputPassword>
              </ContainerLogin>
            )}
            {enterprise && (
              <>
                <ContainerLogin>
                  <InputCnpj className="field-cpnj">
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
                  </InputCnpj>
                  <InputPassword className="field-password">
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
                  </InputPassword>
                </ContainerLogin>
                <FilialOption>
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
                </FilialOption>
              </>
            )}
          </Inputs>

          <LoginButton
            onClick={() => {
              handleLogin();
            }}
          >
            ENTRAR
          </LoginButton>
        </ContainerBody>
      </Container>
    </>
  );
}

export default Login;
