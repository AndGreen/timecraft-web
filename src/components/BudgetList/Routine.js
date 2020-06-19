import React from 'react';
import { StyledRoutine, Text, RoutineBudgetInput, Shares } from './styles';
import {
  selectDailyBudget,
  updateBudgetThunk,
  updateDailyBudgetReduce,
} from '../../reducers/budgets';
import { useReduxAction } from '../../utils/redux';
import { useSelector } from 'react-redux';

export const Routine = ({ id, color, title }) => {
  const updateBudget = useReduxAction(updateDailyBudgetReduce);
  const updateBudgetAsync = useReduxAction(updateBudgetThunk);
  const budget = useSelector(selectDailyBudget);
  return (
    <>
      <StyledRoutine color={color}>
        <Text>{title}</Text>
        <Shares>
          <RoutineBudgetInput
            min="0"
            type="number"
            maxLength="2"
            size="2"
            onBlur={(e) => {
              const number = Number(e.target.value);
              if (!number) e.target.value = 0;
              updateBudget({ id, value: e.target.value });
              updateBudgetAsync();
            }}
            defaultValue={budget[id] || 0}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
              }
            }}
          />
        </Shares>
      </StyledRoutine>
    </>
  );
};
