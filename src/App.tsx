import React from 'react';
import styled, { css } from 'styled-components';
import { Styles, theme } from './styles';

const Page = styled.div`
  width: 390px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: ${theme.sizes.title};
  color: ${theme.colors.main};
  font-weight: bold;
  margin-top: 73px;
  margin-bottom: 27px;
`;

type ColorPickerProps = {
  active?: boolean;
};

const arrowCss = css`
  border-color: ${theme.colors.font} transparent;
  border-style: solid;
  height: 0px;
  width: 0px;
`;

const arrowDownCss = css`
  ${arrowCss};
  border-width: 5px 5px 0px 5px;
`;

const arrowUpCss = css`
  ${arrowCss};
  border-width: 0px 5px 5px 5px;
`;

const ColorPicker = styled.div<ColorPickerProps>`
  position: relative;
  border: 1px solid ${theme.colors.borders};
  display: flex;
  height: 36px;
  align-items: center;
  padding-left: 36px;
  color: ${theme.colors.font};
  font-weight: bold;
  cursor: pointer;

  &:before {
    display: block;
    position: absolute;
    content: '';
    width: 12px;
    height: 12px;
    left: 12px;
    top: 12px;
    background-color: ${theme.colors.font};
  }

  &:after {
    display: block;
    content: '';
    position: absolute;
    right: 12px;
    ${(p) => (p.active ? arrowUpCss : arrowDownCss)}
  }
`;

function App() {
  return (
    <>
      <Page>
        <Logo>Smoothy</Logo>
        <ColorPicker>Color</ColorPicker>
      </Page>
      <Styles />
    </>
  );
}

export default App;
