import styled from 'styled-components';
import { theme } from '../../styles';

export const DayBlockStyled = styled.div`
  width: 35px;
  height: 35px;
  display: table-cell;
  border: 1px solid ${theme.colors.borders};
  &:nth-child(4),
  &:nth-child(7) {
    border-right-width: 3px;
  }
`;
