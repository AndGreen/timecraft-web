import React from 'react';
import { colors } from '../../types/colors';
import { useSelector } from 'react-redux';
import { useReduxAction } from '../../utils/redux';
import {
  togglePickerStatusAction,
  changeActiveColorAction,
} from '../../reducers/colors';
import { selectActiveColor, selectPickerStatus } from '../../selectors/colors';
import { Wrapper, Component, ColorList, ColorBlock } from './styles';

export const ColorPicker = () => {
  const isOpened = useSelector(selectPickerStatus);
  const activeColor = useSelector(selectActiveColor);
  const togglePickerStatus = useReduxAction(togglePickerStatusAction);
  const changeActiveColor = useReduxAction(changeActiveColorAction);

  return (
    <Wrapper>
      <Component
        opened={isOpened}
        activeColor={activeColor}
        onClick={() => {
          togglePickerStatus();
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
                togglePickerStatus();
              }}
            />
          ))}
          <ColorBlock
            onClick={() => {
              changeActiveColor('background');
              togglePickerStatus();
            }}
          />
        </ColorList>
      )}
    </Wrapper>
  );
};
