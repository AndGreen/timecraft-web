import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useReduxAction } from '../../utils/redux';
import { Wrapper, Component, StyledDayPicker } from './styles';
import DayPicker, { Modifier } from 'react-day-picker';
import {
  selectOpenedPickerName,
  togglePickerNameAction,
} from '../../reducers/picker';
import { selectActiveDay, setActiveDayAction } from '../../reducers/days';

export const DatePicker = () => {
  const pickerName = 'date';
  const openedPicker = useSelector(selectOpenedPickerName);
  const togglePickerStatus = useReduxAction(togglePickerNameAction);
  const isOpened = openedPicker === pickerName;

  const setSelectedDay = useReduxAction(setActiveDayAction);
  const selectedDayString = useSelector(selectActiveDay);
  const selectedDay = new Date(selectedDayString);

  const handleDayClick = (day: Date) => {
    setSelectedDay(String(day));
    togglePickerStatus(pickerName);
  };

  console.log(selectedDay);

  return (
    <Wrapper>
      <Component
        opened={isOpened}
        onClick={() => {
          togglePickerStatus(pickerName);
        }}
      >
        {(selectedDay && selectedDay.toLocaleDateString()) || 'Day'}
      </Component>
      {isOpened && (
        <StyledDayPicker>
          <DayPicker
            showOutsideDays={true}
            selectedDays={selectedDay}
            onDayClick={handleDayClick}
          />
        </StyledDayPicker>
      )}
    </Wrapper>
  );
};
