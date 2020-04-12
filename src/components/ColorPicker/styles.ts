import styled, { css } from 'styled-components';
import { theme } from '../../styles';

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

type ColorPickerProps = {
  active?: boolean;
};

export const ColorPickerStyled = styled.div<ColorPickerProps>`
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
