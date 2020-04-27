import styled, { css } from 'styled-components';
import { theme } from '../../styles';
import Cross from '../../assets/images/cross.svg';
import { colors } from '../../types/colors';
import { arrowUpCss, arrowDownCss } from '../Icons/arrow';

const crossCss = css`
  background-color: ${theme.colors.borders};
  -webkit-mask: url(${Cross}) no-repeat 50% 50%;
  mask: url(${Cross}) no-repeat 50% 50%;
`;

export const Wrapper = styled.div`
  position: relative;
  width: 245px;
`;

type ColorPickerProps = {
  opened?: boolean;
  activeColor?: string;
};

const getCrossColor = (activeColor?: string) =>
  activeColor && activeColor !== 'background'
    ? colors[activeColor]
    : theme.colors.font;

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

  &:before {
    display: block;
    position: absolute;
    content: '';
    width: 12px;
    height: 12px;
    left: 12px;
    top: 12px;

    ${(p) => p.activeColor === 'background' && crossCss};
    background-color: ${(p) => getCrossColor(p.activeColor)};
  }

  &:after {
    display: block;
    content: '';
    position: absolute;
    right: 12px;
    top: 50%;
    ${(p) => (p.opened ? arrowUpCss : arrowDownCss)}
  }
`;

export const ColorList = styled.div`
  width: 384px;
  margin-top: -1px;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  border-left: 1px solid black;
  border-top: 1px solid black;
`;

type ColorBlockProps = {
  color?: string;
};

const backgroundColor = (p: ColorBlockProps) =>
  p.color || theme.colors.background;

export const ColorBlock = styled.div<ColorBlockProps>`
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  background-color: ${(p) => backgroundColor(p)};
  cursor: pointer;

  background-color: ${(p) => backgroundColor(p)};

  &:after {
    display: block;
    content: '';
    position: absolute;
    width: 48.63px;
    height: 48.5px;

    ${(p) => !p.color && crossCss}
  }

  &:hover:before {
    display: block;
    position: absolute;
    content: '';
    width: 47.63px;
    height: 47.63px;
    background-color: ${theme.colors.font};
    opacity: 0.2;
  }
`;
