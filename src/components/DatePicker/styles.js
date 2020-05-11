import styled from 'styled-components';
import { theme } from '../../styles';
import { arrowDownCss, arrowUpCss } from '../Icons/arrow';

export const Wrapper = styled.div`
  position: relative;
  width: 127px;
  div {
    outline: none;
  }
  & input {
    border-radius: 0;
    padding: 0 0 0 12px;
    cursor: pointer;
    width: 119px;
    background: none;
    border: 1px solid ${theme.colors.borders};
    height: 36px;
    font-size: ${theme.sizes.font};
    font-family: 'Roboto Mono';
    font-weight: bold;
    color: ${theme.colors.font};
  }
  & input::placeholder {
    color: ${theme.colors.font};
  }

  .DayPickerInput-Overlay {
    background: ${theme.colors.background};
    border: 1px solid ${theme.colors.borders};
    box-shadow: none;
    color: ${theme.colors.font};
  }
  .DayPickerInput-OverlayWrapper {
    left: -153px;
    top: -1px;
  }
  .DayPickerInput-OverlayWrapper:before {
    right: -152px;
    /* top: 0px; */
    display: block;
    width: 131px;
    height: 1px;
    content: '';
    position: absolute;
    background: ${theme.colors.background};
    z-index: 3;
  }
  .DayPicker-Day--outside {
    color: ${theme.colors.font};
    opacity: 0.2;
  }
  .DayPicker-Day,
  .DayPicker-Caption {
    color: ${theme.colors.font};
  }
  .DayPicker-Day--today {
    color: ${theme.colors.background};
    background: ${theme.colors.font};
  }
  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: ${theme.colors.main};
    color: ${theme.colors.background};
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--today):not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    // todo: theme.colors.font to rgba converter
    background-color: rgba(255, 255, 255, 0.1);
    color: ${theme.colors.font};
  }
`;

export const Component = styled.div`
  position: relative;
  border: 1px solid ${theme.colors.borders};
  display: flex;
  height: 36px;
  align-items: center;
  padding-left: 12px;
  color: ${theme.colors.font};
  font-weight: bold;
  cursor: pointer;

  &:after {
    display: block;
    content: '';
    position: absolute;
    right: 12px;
    top: 50%;
    ${(p) => (p.opened ? arrowUpCss : arrowDownCss)}
  }
`;

export const StyledDayPicker = styled.div`
  z-index: 3;
  right: 0;
  margin-top: -1px;
  position: absolute;
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.borders};

  & :before {
    position: absolute;
    display: block;
    content: '';
    background: #33323b;
    height: 1px;
    width: 126px;
    top: -1px;
    right: 0;
  }
`;
