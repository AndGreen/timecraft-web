import React from 'react';
import { StyledAction, Text, BudgetCount, Shares } from './styles';

export const Action = ({ color, title, count, budget }) => {
  return (
    <>
      <StyledAction color={color}>
        <Text>{title}</Text>
        <Shares>
          <Text>
            {count}
            <BudgetCount>/{budget}</BudgetCount>
          </Text>
        </Shares>
      </StyledAction>
    </>
  );
};
