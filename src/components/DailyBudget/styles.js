import styled from 'styled-components';
import { theme } from '../../styles';

export const StyledActionsList = styled.div`
  margin-top: 8px;
`;

export const StyledAction = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  background: ${theme.colors.background};
  display: flex;
  height: 36px;
  align-items: center;
  padding-left: 36px;
  color: ${theme.colors.font};
  width: 275px;
  margin-left: 65px;

  :not(:first-child) {
    border-top: 1px solid ${theme.colors.subBackground};
  }

  &:before {
    display: block;
    position: absolute;
    content: '';
    width: 12px;
    height: 12px;
    left: 12px;
    top: 12px;

    background-color: ${(p) => p.color};
  }
`;

export const Shares = styled.div``;

export const Text = styled.div`
  max-width: 232px;
  clear: both;
  display: inline-block;
  overflow: scroll;
  white-space: nowrap;
`;
export const BudgetCount = styled(Text)`
  display: inline-flex;
  opacity: 0.3;
`;
