import styled, { css } from 'styled-components';
import { theme, noselect } from '../../styles';
import Cross from '../../assets/images/cross.svg';

const arrowCss = css`
  border-color: ${theme.colors.font} transparent;
  border-style: solid;
  height: 0px;
  width: 0px;
`;

const arrowDownCss = css`
  ${arrowCss};
  border-width: 4px 4px 0px 4px;
`;

const arrowUpCss = css`
  ${arrowCss};
  border-width: 0px 4px 4px 4px;
`;

const crossCss = css`
  background-image: url(${Cross});
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;

type ColorPickerProps = {
  active?: boolean;
};

export const Wrapper = styled.div`
  position: relative;
`;

export const Component = styled.div<ColorPickerProps>`
  position: relative;
  border: 1px solid ${theme.colors.borders};
  display: flex;
  height: 36px;
  align-items: center;
  padding-left: 36px;
  color: ${theme.colors.font};
  font-weight: bold;
  cursor: pointer;
  ${noselect}

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
    top: 50%;
    ${(p) => (p.active ? arrowUpCss : arrowDownCss)}
  }
`;

export const ColorList = styled.div`
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  border-left: 1px solid black;
`;

type ColorBlockProps = {
  color?: string;
};

export const ColorBlock = styled.div<ColorBlockProps>`
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  width: 48.63px;
  height: 48.5px;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  background-color: ${(p) => p.color || theme.colors.background};
  cursor: pointer;

  ${(p) => !p.color && crossCss}
`;
