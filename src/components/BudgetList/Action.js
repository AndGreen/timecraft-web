import React from 'react';
import { StyledAction, Text, ActionBudgetInput, Shares } from './styles';
import {
  selectDailyBudget,
  updateDailyBudgetReduce,
} from '../../reducers/budgets';
import { useReduxAction } from '../../utils/redux';
import { useSelector } from 'react-redux';

export const Action = ({ id, color, title }) => {
  const updateBudget = useReduxAction(updateDailyBudgetReduce);
  const budget = useSelector(selectDailyBudget);
  return (
    <>
      <StyledAction color={color}>
        <Text>{title}</Text>
        <Shares>
          <ActionBudgetInput
            min="0"
            type="number"
            maxLength="2"
            size="2"
            onBlur={(e) => {
              const number = Number(e.target.value);
              if (!number) e.target.value = 0;
              updateBudget({ id, value: e.target.value });
            }}
            defaultValue={budget[id] || 0}
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
