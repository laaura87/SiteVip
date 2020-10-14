import styled from "styled-components";

export const Container = styled.div`
  background-color: white;
  width: 90%;
  min-height: 600px;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 14px 15px 20px -20px rgba(0, 0, 0, 0.75);
`;

export const CarEmpty = styled.div`
  background-color: white;
  width: 90%;
  height: 600px;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 14px 15px 20px -20px rgba(0, 0, 0, 0.75);
  h1 {
    display: flex;
    align-items: center;
    font-size: 22px;
    color: white;
    margin-bottom: 20px;
    svg {
      margin-right: 10px;
    }
  }

  div p {
    font-size: 18px;
    text-align: center;
  }

  div a span {
    color: white !important;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;

    svg {
      margin-right: 10px;
    }
  }

  div a span:hover {
    color: #a9a9a9 !important;
    text-decoration: none !important;
    transition: 0.2s;
  }
`;

export const ContainerProducts = styled.tr`
  width: 100%;
  td {
    text-align: center;
  }

  .product-container {
    display: flex;
    width: 100%;
    align-items: center;

    img {
      margin-right: 20px;
    }
  }
  svg {
    cursor: pointer;
  }
`;

export const Grid = styled.table`
  border-spacing: 0;

  thead tr th {
    text-align: center;
  }

  th {
    text-transform: uppercase;
    color: #777777;
    font-size: 14px;
  }

  td,
  th {
    padding: 16px;
    border-bottom: 1px solid #d9d9d9;
  }
  .last-table {
    button {
      padding: 4px;
      background-color: #dc143c;
      text-transform: uppercase;
    }
  }
`;

export const ContainerSub = styled.div`
  margin-top: 15px;
  margin-right: 20px;
  background-color: #fcf8e3;
  padding: 2em;
  float: right;
  width: 20%;
  border: 1px solid #eceeef;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Finish = styled.button`
  margin-top: 20px;
  width: 30%;
  height: 50px;
  text-transform: uppercase;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  background-color: #009e2a;
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: space-between;
  margin-left: 30px;
  p {
    margin-top: 12px;
    margin-left: 20px;
  }
  span {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    overflow: none;
    width: 20%;
    height: 100%;
    box-sizing: border-box;
    background-color: #008300;
    svg {
      margin-top: 12px;
    }
  }
`;
