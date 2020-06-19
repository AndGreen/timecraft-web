import React from 'react';
import { StyledRoutine, Text, Percentage, Shares } from './styles';

export const Routine = ({ id, editRoutineId, color, title, count, share }) => {
  return (
    <>
      <StyledRoutine color={color}>
        <Text>{title}</Text>
        <Shares>
          <Text>{count}</Text>
          <Percentage>{share}%</Percentage>
        </Shares>
      </StyledRoutine>
    </>
  );
};
