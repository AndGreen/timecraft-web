import styled, { css } from 'styled-components';
import { theme } from '../../styles';
import { colors } from '../../types/colors';

type Props = {
  active?: boolean;
  color: string;
};

export const DayBlockStyled = styled.div<Props>`
  width: 35px;
  height: 35px;
  display: table-cell;
  box-sizing: border-box;
  cursor: pointer;
  background-color: ${(p) => colors[p.color]};
  border: 1px solid ${theme.colors.borders};
  &:nth-child(4),
  &:nth-child(7) {
    border-right-width: 3px;
  }

  ${(p) =>
    p.active &&
    css`
      position: relative;
      &:before {
        left: -2px;
        top: -2px;
        width: 34px;
        height: 34px;
        display: block;
        content: '';
        position: absolute;
        border: 2px solid ${theme.colors.font};
      }
    `}
`;
