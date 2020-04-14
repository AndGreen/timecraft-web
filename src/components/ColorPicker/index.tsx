import React from 'react';
import { colors } from '../../types/colors';
import { useReduxAction, useReduxState } from '../../utils/hooks';
import { togglePickerStatusAction } from '../../reducers/colors';
import { Wrapper, Component, ColorList, ColorBlock } from './styles';

export const ColorPicker = () => {
  const isOpened = useReduxState('colors.isPickerOpened');
  const togglePickerStatus = useReduxAction(togglePickerStatusAction);

  return (
    <Wrapper>
      <Component
        active={isOpened}
        onClick={() => {
          togglePickerStatus();
        }}
      >
        Color
      </Component>
      {isOpened && (
        <ColorList>
          {Object.keys(colors).map((colorName) => (
            <ColorBlock key={colorName} color={colors[colorName]} />
          ))}
          <ColorBlock />
        </ColorList>
      )}
    </Wrapper>
  );
};
