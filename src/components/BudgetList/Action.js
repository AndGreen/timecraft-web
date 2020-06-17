import React from 'react';
import { StyledAction, Text, ActionBudgetInput, Shares } from './styles';

export const Action = ({ id, editActionId, color, title, count, share }) => {
  return (
    <>
      <StyledAction color={color}>
        <Text>{title}</Text>
        <Shares>
          <Text>{count}</Text>
          <ActionBudgetInput
            min="0"
            type="number"
            maxLength="2"
            size="2"
            onBlur={(e) => {
              const number = Number(e.target.value);
              if (!number) e.target.value = 0;
              console.log(e.target.value);
            }}
            defaultValue={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
              }
            }}
          />
        </Shares>
      </StyledAction>
    </>
  );
};
