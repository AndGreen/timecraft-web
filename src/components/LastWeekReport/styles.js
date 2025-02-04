import styled from 'styled-components';
import { theme } from '../../styles';

export const StyledRoutinesList = styled.div``;

export const StyledRoutine = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  background: ${theme.colors.background};
  display: flex;
  height: 36px;
  align-items: center;
  padding-left: 36px;
  color: ${theme.colors.font};

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

export const Percentage = styled(Text)`
  opacity: 0.5;
  width: 40px;
  text-align: right;
`;
export const PageTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${theme.colors.subBackground};
  color: ${theme.colors.main};
`;
