import styled, { css } from 'styled-components';
import { theme } from '../../styles';
import { colors } from '../../types/colors';
import { hexToRGB } from '../../utils/colors';

export const DayBlockStyled = styled.div`
  width: 35px;
  height: 35px;
  display: table-cell;
  box-sizing: border-box;
  cursor: pointer;
  border: 1px solid ${theme.colors.borders};
  &:nth-child(4),
  &:nth-child(7) {
    border-right-width: 3px;
  }

  ${(p) =>
    p.future &&
    css`
      background: repeating-linear-gradient(
        45deg,
        ${theme.colors.background} 2px,
        ${theme.colors.background} 3px,
        transparent 0,
        transparent 8px
      );
    `};

  background-color: ${(p) =>
    p.future && p.color ? hexToRGB(p.color, 0.8) : p.color};

  ${(p) =>
    p.active &&
    css`
      position: relative;
      &:before {
        z-index: 1;
        left: -2px;
        top: -2px;
        width: 33px;
        height: 34px;
        display: block;
        content: '';
        position: absolute;
        border: 2px solid ${theme.colors.font};
      }
    `};
`;
