import React from 'react';
import { colors } from '../../types/colors';
import { useSelector } from 'react-redux';
import { useReduxAction } from '../../utils/redux';
import {
  changeActiveColorAction,
  selectActiveColor,
} from '../../reducers/colors';
import {
  togglePickerNameAction,
  selectOpenedPickerName,
} from '../../reducers/picker';
import { Wrapper, Component, ColorList, ColorBlock } from './styles';

export const ColorPicker = () => {
  const pickerName = 'color';
  const openedPicker = useSelector(selectOpenedPickerName);
  const togglePickerStatus = useReduxAction(togglePickerNameAction);
  const isOpened = openedPicker === pickerName;

  const activeColor = useSelector(selectActiveColor);
  const changeActiveColor = useReduxAction(changeActiveColorAction);

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
              changeActiveColor('background');
              togglePickerStatus(pickerName);
            }}
          />
        </ColorList>
      )}
    </Wrapper>
  );
};
