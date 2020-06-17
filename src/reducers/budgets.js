import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from '../utils/localstorage';
import { updateBudget } from '../api/firebase';
import { syncDataThunk } from './user';

export const updateBudgetThunk = createAsyncThunk(
  '/actions/update',
  async (_, ThunkAPI) => {
    const state = ThunkAPI.getState();
    const {
      user: { profile },
      budgets: { daily },
    } = state;

    await updateBudget(profile, daily);
  },
);

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
  extraReducers: {
    [syncDataThunk.fulfilled]: (state, action) => {
      state.daily = action.payload.budgets;
    },
  },
});

export const {
  reducer: budgets,
  actions: { updateDailyBudgetReduce },
} = budgetSlice;

export const selectDailyBudget = (state) => state.budgets.daily;
