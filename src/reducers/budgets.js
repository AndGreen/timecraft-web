import { createSlice } from '@reduxjs/toolkit';
import { loadState } from '../utils/localstorage';

const budgetSlice = createSlice({
  name: 'budgets',
  initialState: {
    daily: loadState('budget') || {},
  },
  reducers: {
    updateDailyBudgetReduce: (state, action) => {
      state.daily[action.payload.id] = action.payload.value;
    },
  },
});

export const {
  reducer: budgets,
  actions: { updateDailyBudgetReduce },
} = budgetSlice;

export const selectDailyBudget = (state) => state.budgets.daily;
