import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    background: '#33333C',
    subBackground: '#212121',
    main: '#72CEDE',
    borders: 'black',
  },
  sizes: {
    title: '32px',
    font: '14px',
    small: '13px',
  },
};

export const Styles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto Mono', monospace;
    font-size: ${theme.sizes.font};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.colors.background};
    border-top: 12px solid ${theme.colors.subBackground};
  }
`;
