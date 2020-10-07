import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: white;
  height: 160px;
  padding: 5px;
`;

export const SubHeader = styled.div`
  width: 90%;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div svg {
    margin-right: 5px;
  }

  .exit {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .exit div {
    cursor: pointer;
  }

  .exit div:hover {
    color: #212529;
    text-decoration: underline;
    transition: 0.2s;
  }
`;

export const Header = styled.header`
  width: 90%;
  margin: 28px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div:nth-child(1) {
    width: 20%;
  }

  img {
    width: 50px;
    height: 50px;
  }
`;

export const InputSearch = styled.div`
  width: 80%;
  margin-left: 18px;
  box-sizing: border-box;

  form {
    display: flex;
    input {
      padding: 6px;
      width: 100%;
      border: 1px solid black;
      outline: none;
    }
  }

  .button-input {
    border-radius: 0%;
    padding: 6px;
    background-color: #22314a;
  }
  .bg-hover :hover {
    background-color: #38507a;
    transition: 0.2s;
  }
`;

export const MenuDropDown = styled.div`
  width: 20%;
  h1 {
    border-top: none !important;

    color: white;
  }
`;
