import styled, { keyframes } from "styled-components";

const appear = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

export const Wrapper = styled.div`
  padding: 0.5em;
`;

export const MainBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em;
  will-change: transform, opacity;
  animation: ${appear} 1s ease;
  animation-delay: 200ms;
  animation-fill-mode: backwards;
`;

export const BoardList = styled.ul`
  margin: 0;
  padding: 0;
  width: 300px;
  list-style: none;
`;
