import styled from 'styled-components';
import { theme } from '../../styles';

type WrapperProps = {
  disabled?: boolean;
};

export const DayGridWrapper = styled.div<WrapperProps>`
  display: table;
  border-collapse: collapse;
  margin-left: 12px;
  opacity: ${(p) => p.disabled && 0.2};
  z-index: 1;
`;

export const Line = styled.div`
  display: table-row;
`;
export const Label = styled.div`
  display: table-cell;
  padding-right: 12px;
  font-size: ${theme.sizes.small};
  color: ${theme.colors.main};
  vertical-align: middle;
`;
