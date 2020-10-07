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
    cursor: pointer;
  }

  .exit:hover {
    color: #212529;
    text-decoration: underline;
    transition: 0.2s;
  }
`;

export const Header = styled.header`
  width: 90%;
  margin: 10px auto;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 90px;
    height: 90px;
  }
`;

export const InputSearch = styled.span`
  display: flex;
  margin-right: 20px;
  input {
    padding: 6px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border: 1px solid black;
    outline: none;
  }
  .button-input {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;

    border-radius: 0;
    padding: 6px;
    background-color: #22314a;
  }
`;

export const MenuDropDown = styled.div`
  h1 {
    border-top: none !important;

    color: white;
  }
`;
