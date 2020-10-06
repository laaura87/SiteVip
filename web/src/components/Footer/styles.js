import styled from "styled-components";

export const Container = styled.footer`
  background-color: white;
  width: 100%;

  div {
    padding-top: 8px;
  }

  div h2 {
    margin: 0 auto;
    text-align: center;
    margin-top: 12px;
    color: #808080;
    font-size: 22px;
    margin-left: 12px;
    margin-bottom: 4px;
    width: 90%;
    border-bottom: 1px solid #d3d3d3;
  }
  ul {
    list-style: none;
  }

  p {
    text-align: center;
  }

  .contact li {
    display: flex;
    align-items: center;
    span {
      margin-right: 5px;
    }
    font-size: 14px;
    text-align: center;
  }

  .social {
    margin: 0 auto;
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .copy {
    margin-top: 50px;
    margin-bottom: 0px;
  }
`;
