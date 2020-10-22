import styled from "styled-components";

export const Container = styled.div`
  margin: 20px auto;
  width: 90%;
  padding-bottom: 70px;
  border-radius: 8px;
  background-color: white;
  position: relative;
  .title-results {
    width: 95%;
    margin: 0 auto;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between;
  }
  .title-results div {
    display: flex;
    align-items: center;
  }
  .title-results div h1 {
    text-align: center;
    padding-top: 8px;
  }
  .title-results div p {
    margin-top: 23px;
    margin-left: 10px;
  }

  .root {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 32%;
    bottom: 10px;
    padding-top: 10px;
    text-align: center;
    padding-bottom: 10px;
  }

  .root-data-fetch {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 50%;
    bottom: 10px;
    text-align: center;
  }
`;

export const FormSelect = styled.form`
  select {
    margin-top: 8px;
    margin-left: 8px;
  }
`;
