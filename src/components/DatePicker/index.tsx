import React from 'react';
import { useSelector } from 'react-redux';
import { colors } from '../../types/colors';
import { useReduxAction } from '../../utils/redux';
import { Wrapper, Component, StyledDayPicker } from './styles';
import DayPicker from 'react-day-picker';
import {
  selectOpenedPickerName,
  togglePickerNameAction,
} from '../../reducers/picker';

export const DatePicker = () => {
  const pickerName = 'date';
  const openedPicker = useSelector(selectOpenedPickerName);
  const togglePickerStatus = useReduxAction(togglePickerNameAction);
  const isOpened = openedPicker === pickerName;

  return (
    <Wrapper>
      <Component
        opened={isOpened}
        onClick={() => {
          togglePickerStatus(pickerName);
        }}
      >
        Day
      </Component>
      {isOpened && (
        <StyledDayPicker>
          <DayPicker
            showOutsideDays={true}
            // placeholder={`${formatDate(new Date())}`}
            // keepFocus={false}
          />
        </StyledDayPicker>
      )}
    </Wrapper>
  );
};
