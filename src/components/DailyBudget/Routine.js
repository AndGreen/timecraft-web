import React from 'react';
import { StyledRoutine, Text, BudgetCount, Shares } from './styles';

export const Routine = ({ color, title, count, budget }) => {
  return (
    <>
      <StyledRoutine color={color}>
        <Text>{title}</Text>
        <Shares>
          <Text>
            {count}
            <BudgetCount>/{budget}</BudgetCount>
          </Text>
        </Shares>
      </StyledRoutine>
    </>
  );
};
