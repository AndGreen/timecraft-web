import styled, { css } from 'styled-components';
import { theme } from '../../styles';
import Cross from '../../assets/images/cross.svg';
import { colors } from '../../types/colors';

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
  background-color: ${theme.colors.borders};
  -webkit-mask: url(${Cross}) no-repeat 50% 50%;
  mask: url(${Cross}) no-repeat 50% 50%;
`;

export const Wrapper = styled.div`
  position: relative;
  & input {
    border-radius: 0;
    padding: 0 0 0 12px;
    cursor: pointer;
    width: 119px;
    background: none;
    border: 1px solid ${theme.colors.borders};
    height: 36px;
    font-size: ${theme.sizes.font};
    font-family: 'Roboto Mono';
    font-weight: bold;
    color: ${theme.colors.font};
  }
  & input::placeholder {
    color: ${theme.colors.font};
  }

  &:after {
    display: block;
    content: '';
    position: absolute;
    right: 12px;
    top: 50%;
    ${arrowDownCss || arrowDownCss}
  }

  .DayPickerInput-Overlay {
    background: ${theme.colors.background};
    border: 1px solid ${theme.colors.borders};
    box-shadow: none;
    color: ${theme.colors.font};
  }
  .DayPickerInput-OverlayWrapper {
    left: -153px;
    top: -1px;
  }
  .DayPickerInput-OverlayWrapper:before {
    right: -152px;
    /* top: 0px; */
    display: block;
    width: 131px;
    height: 1px;
    content: '';
    position: absolute;
    background: ${theme.colors.background};
    z-index: 3;
  }
  .DayPicker-Day--today {
    color: ${theme.colors.background};
    background: ${theme.colors.font};
  }
  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: ${theme.colors.main};
    color: ${theme.colors.background};
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--today):not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    // todo: theme.colors.font to rgba converter
    background-color: rgba(255, 255, 255, 0.1);
    color: ${theme.colors.font};
  }
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
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  border-left: 1px solid black;
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
  width: 48.63px;
  height: 48.5px;
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
