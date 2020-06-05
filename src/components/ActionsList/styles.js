import styled from 'styled-components';
import { theme } from '../../styles';

export const StyledActionsList = styled.div`
  border: 1px solid ${theme.colors.border};
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

export const ActionMenu = styled.div`
  display: flex;
`;
export const ActionMenuItem = styled.div`
  padding-right: 15px;
  font-size: 12px;
  color: ${(p) => (p.cancelType ? theme.colors.contrast : theme.colors.main)};
  cursor: pointer;
`;

export const ActionTitleInput = styled.input`
  background: none;
  padding: 0;
  border: none;
  color: ${theme.colors.font};
  width: 100%;
  margin-right: 15px;
`;

export const NewActionButton = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
  cursor: pointer;
  background: ${(p) => p.border && theme.colors.subBackground};
  color: ${theme.colors.font};
`;

export const ColorList = styled.div`
  width: 384px;
  margin-top: -1px;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  border-left: 1px solid black;
  border-top: 1px solid black;
`;

const backgroundColor = (p) => p.color || theme.colors.background;

export const ColorBlock = styled.div`
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  width: 48px;
  height: 48px;
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

export const Text = styled.div`
  max-width: 232px;
  clear: both;
  display: inline-block;
  overflow: scroll;
  white-space: nowrap;
`;
