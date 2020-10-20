import styled from "styled-components";

export const Container = styled.div`
  * {
    box-shadow: none !important;
  }
  .dropdown {
    box-shadow: none !important;
    padding: 4px;
    .btn-success {
      background-color: #171d4b;
      border-color: #171d4b;
    }
    .btn-success.focus,
    .btn-success:focus {
      box-shadow: none !important;
    }
    svg {
      margin-top: 0px;
      margin-right: 5px;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
