import { createSlice } from '@reduxjs/toolkit';
import { loadState } from '../utils/localstorage';

const budgetSlice = createSlice({
  name: 'budgets',
  initialState: {
    daily: loadState('budget') || {},
  },
  reducers: {
    updateDailyBudgetReduce: (state, action) => {
      const { id, value } = action.payload;
      if (Number(value)) state.daily[id] = value;
      else {
        delete state.daily[id];
      }
    },
  },
});

export const {
  reducer: budgets,
  actions: { updateDailyBudgetReduce },
} = budgetSlice;

export const selectDailyBudget = (state) => state.budgets.daily;
