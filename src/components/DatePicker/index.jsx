import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useReduxAction } from '../../utils/redux';
import { Wrapper, Component, StyledDayPicker } from './styles';
import DayPicker  from 'react-day-picker';
import {
  selectOpenedPickerName,
  togglePickerNameAction,
} from '../../reducers/picker';
import { selectActiveDay, setActiveDayAction } from '../../reducers/days';
import { isToday } from '../../utils/time';
import { usePickerCloseOutsideClick } from '../../utils/hooks';

export const DatePicker = () => {
  const pickerName = 'date';
  const openedPicker = useSelector(selectOpenedPickerName);
  const togglePickerStatus = useReduxAction(togglePickerNameAction);
  const isOpened = openedPicker === pickerName;

  const setSelectedDay = useReduxAction(setActiveDayAction);
  const selectedDayString = useSelector(selectActiveDay);
  const selectedDay = new Date(selectedDayString);
  const selectedDayLocale = selectedDay.toLocaleDateString('en');

  const handleDayClick = (day) => {
    setSelectedDay(day.toLocaleDateString('en'));
    togglePickerStatus(pickerName);
  };

  const pickerRef = useRef(null);
  usePickerCloseOutsideClick(pickerRef, pickerName);

  return (
    <Wrapper ref={pickerRef}>
      <Component
        opened={isOpened}
        onClick={() => {
          togglePickerStatus(pickerName);
        }}
      >
        {isToday(selectedDayLocale) ? 'today' : selectedDayLocale}
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
