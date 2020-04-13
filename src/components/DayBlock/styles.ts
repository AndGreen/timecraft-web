import styled, { css } from 'styled-components';
import { theme } from '../../styles';

type Props = {
  active?: boolean;
};

export const DayBlockStyled = styled.div<Props>`
  width: 35px;
  height: 35px;
  display: table-cell;
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
        left: -1px;
        top: -1px;
        width: 35px;
        height: 35px;
        display: block;
        content: '';
        position: absolute;
        border: 1px solid #667d8a;
      }
    `}
`;
