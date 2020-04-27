import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';

const daysSlice = createSlice({
  name: 'days',
  initialState: {
    active: String(new Date()),
  },
  reducers: {
    setActiveDay: (state, action) => ({
      ...state,
      active: action.payload,
    }),
  },
});

export const {
  reducer: days,
  actions: { setActiveDay: setActiveDayAction },
} = daysSlice;

export const selectActiveDay = (state: RootState) => state.days.active;
