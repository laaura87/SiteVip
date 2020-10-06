import styled from "styled-components";

export const Header = styled.header`
  background-color: white;
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 90px;
    height: 90px;
    margin-left: 20px;
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
  ul {
    list-style: none;
  }
`;
