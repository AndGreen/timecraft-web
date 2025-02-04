import React from 'react';
import { colors, removedColor } from '../../types/colors';
import { useSelector } from 'react-redux';
import { useReduxAction } from '../../utils/redux';
import {
  changeActiveColorRoutine,
  selectActiveColor,
} from '../../reducers/colors';
import {
  togglePickerNameReduce,
  selectOpenedPickerName,
} from '../../reducers/picker';
import { Wrapper, Component, ColorList, ColorBlock } from './styles';

export const ColorPicker = () => {
  const pickerName = 'color';
  const openedPicker = useSelector(selectOpenedPickerName);
  const togglePickerStatus = useReduxAction(togglePickerNameReduce);
  const isOpened = openedPicker === pickerName;

  const activeColor = useSelector(selectActiveColor);
  const changeActiveColor = useReduxAction(changeActiveColorRoutine);

  return (
    <Wrapper>
      <Component
        opened={isOpened}
        activeColor={activeColor}
        onClick={() => {
          togglePickerStatus(pickerName);
        }}
      >
        Color
      </Component>
      {isOpened && (
        <ColorList>
          {Object.keys(colors).map((colorName) => (
            <ColorBlock
              key={colorName}
              color={colors[colorName]}
              onClick={() => {
                changeActiveColor(colorName);
                togglePickerStatus(pickerName);
              }}
            />
          ))}
          <ColorBlock
            onClick={() => {
              changeActiveColor(removedColor);
              togglePickerStatus(pickerName);
            }}
          />
        </ColorList>
      )}
    </Wrapper>
  );
};
