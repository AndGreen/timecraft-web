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

const Badge = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 26px;
  width: 295px;
  margin-left: 64px;
  height: 36px;
  padding-left: 20px;
`;

export const DoneBadge = styled(Badge)`
  color: #67ac5c;
  border: 1px solid #67ac5c;
  background: rgba(51, 60, 55, 1);
`;

export const BudgetButton = styled(Badge)`
  margin-top: 10px;
  cursor: pointer;
  text-align: right;
  color: ${theme.colors.font};
  justify-content: center;
  padding-left: 0;
`;
