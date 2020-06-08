import { css, createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    background: '#33333C',
    subBackground: '#212121',
    main: '#72CEDE',
    contrast: '#E25241',
    font: '#EBEBEB',
    borders: 'black',
  },
  sizes: {
    title: '32px',
    font: '14px',
    small: '13px',
  },
};

export const noselect = css`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const Styles = createGlobalStyle`
  * {
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    overflow: -moz-scrollbars-none;∏
  }
  body {
    ${noselect};
    margin: 0;
    font-family: 'Roboto Mono', monospace;
    font-size: ${theme.sizes.font};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.colors.background};
    border-top: 12px solid ${theme.colors.subBackground};
    touch-action: pan-x pan-y;
  }
  
  input { 
    font-family: 'Roboto Mono', monospace;
    font-size: ${theme.sizes.font};
  }
  
  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
      outline: none;
  }
  
  a {
    text-decoration: none;
  }
`;
