import styled from 'styled-components';

export const BouncingLoader = styled.div`
  @keyframes bouncing-loader {
    to {
      opacity: 0.1;
      transform: translate3d(0, -8px, 0);
    }
  }

  display: flex;
  justify-content: center;

  & > div {
    width: 8px;
    height: 8px;
    margin: 3px 0.2rem;
    background: ${(p) => p.color || 'white'};
    border-radius: 50%;
    animation: bouncing-loader 0.6s infinite alternate;
  }
  & > div:nth-child(2) {
    animation-delay: 0.2s;
  }
  & > div:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
