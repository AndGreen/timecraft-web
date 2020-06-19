import styled, { css } from 'styled-components';
import { theme } from '../../styles';
import { arrowUpCss, arrowDownCss } from '../Icons/arrow';

export const Wrapper = styled.div`
  position: relative;
  width: 245px;
`;

export const Component = styled.div`
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
    background: ${(p) => p.color || theme.colors.background};
    border: ${(p) => !p.color && `1px solid ${theme.colors.subBackground}`};
  }

  &:after {
    display: block;
    content: '';
    position: absolute;
    right: 12px;
    top: 50%;
    ${(p) => (p.opened ? arrowUpCss : arrowDownCss)}
  }
`;

export const Popup = styled.div`
  width: 382px;
  margin-top: -1px;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  border: 1px solid black;
  background: ${theme.colors.background};
`;

export const StyledRoutinesList = styled.div`
  flex: 1;
  cursor: pointer;
  max-height: 313px;
  overflow: scroll;
`;

export const Text = styled.div`
  max-width: 155px;
  clear: both;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const CancelBtn = styled.div`
  width: 14px;
  height: 14px;
  right: 30px;
  top: 12px;
  position: absolute;

  &:before,
  &:after {
    position: absolute;
    content: ' ';
    left: 6px;
    height: 14px;
    width: 2px;
    background-color: ${theme.colors.font};
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;
