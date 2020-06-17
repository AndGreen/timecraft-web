import React from 'react';
import { StyledAction, Text, BudgetCount, Shares } from './styles';

export const Action = ({ id, editActionId, color, title, count, share }) => {
  return (
    <>
      <StyledAction color={color}>
        <Text>{title}</Text>
        <Shares>
          <Text>
            0<BudgetCount>/0</BudgetCount>
          </Text>
        </Shares>
      </StyledAction>
    </>
  );
};
