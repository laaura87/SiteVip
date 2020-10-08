import styled from "styled-components";

export const Container = styled.div`
  background-color: white;
  border-radius: 6px;
  padding: 2em;
  box-sizing: border-box;
  nav {
    color: black;
    h1 {
      font-size: 24px;
      text-align: center;
      margin-bottom: 10px;
    }

    a {
      color: black;
      padding: 2px;
    }
  }

  .link-menu {
    padding: 8px;
    border-bottom: 1px solid grey;
    display: flex;
    align-items: center;
    span {
      margin-right: 10px;
    }
    font-weight: bold;
    a {
      font-size: 18px;
      text-align: center;
    }
  }

  @media (max-width: 1372px) {
    .link-menu {
      a {
        font-size: 16px;
        text-align: center;
      }
    }
  }
  @media (max-width: 850px) {
    .link-menu {
      a {
        font-size: 14px;
        text-align: center;
      }
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
