import styled from "styled-components";

export const Container = styled.div`
  margin-right: 10px;
  .menu-drop {
    cursor: pointer;
    background-color: #171d4b;
    padding-left: 2px;
    color: white;
    display: flex;
    align-items: center;
    border-radius: 8px;
    text-align: center;
    font-weight: 600;
    p {
      display: flex;
      align-items: center;
      margin-top: 10px;
      line-height: 16px;
    }
    svg {
      margin-right: 5px;
      margin-left: 8px;
    }
  }

  .down {
  }
`;
