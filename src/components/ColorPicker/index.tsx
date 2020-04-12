import React, { useState } from 'react';
import { colors } from '../../types/colors';
import { Wrapper, Component, ColorList, ColorBlock } from './styles';

export const ColorPicker = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Wrapper>
      <Component
        active={isOpen}
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        Color
      </Component>
      {isOpen && (
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
