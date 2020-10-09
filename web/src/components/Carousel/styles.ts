import styled from "styled-components";

export const Wrapper = styled.div`
  overflow-x: hidden;

  .carousel-container {
    user-select: none;
    display: grid;

    img {
      -webkit-user-drag: none;
      -moz-user-drag: none;
      -ms-user-drag: none;
    }

    .carousel-item {
      grid-area: 1 / 1;

      > img {
        display: block;
        max-width: 100%;
      }

      &:not(.active) {
        cursor: pointer;
      }
    }
  }
`;
