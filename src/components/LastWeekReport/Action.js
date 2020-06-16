import React from 'react';
import { StyledAction, Text, Percentage, Shares } from './styles';

export const Action = ({ id, editActionId, color, title, count, share }) => {
  return (
    <>
      <StyledAction color={color}>
        <Text>{title}</Text>
        <Shares>
          <Text>{count}</Text>
          <Percentage>{share}%</Percentage>
        </Shares>
      </StyledAction>
    </>
  );
};
