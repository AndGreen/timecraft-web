import React from 'react';
import { useSelector } from 'react-redux';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { colors } from '../../types/colors';
import { useReduxAction } from '../../utils/redux';
import {
  togglePickerStatusAction,
  changeActiveColorAction,
} from '../../reducers/colors';
import { selectActiveColor, selectPickerStatus } from '../../selectors/colors';
import { Wrapper, Component, ColorList, ColorBlock } from './styles';

export const DatePicker = () => {
  const isOpened = useSelector(selectPickerStatus);
  const activeColor = useSelector(selectActiveColor);
  const togglePickerStatus = useReduxAction(togglePickerStatusAction);
  const changeActiveColor = useReduxAction(changeActiveColorAction);

  return (
    <Wrapper>
      <DayPickerInput
        format="DD/MM/YYYY"
        // placeholder={`${formatDate(new Date())}`}
        keepFocus={false}
      />
    </Wrapper>
  );
};

// <Component
//   opened={isOpened}
//   activeColor={activeColor}
//   onClick={() => {
//     togglePickerStatus();
//   }}
// >
//   Color
// </Component>
