import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';

const colorSlice = createSlice({
  name: 'colors',
  initialState: {
    active: '' as string,
  },
  reducers: {
    changeActiveColor: (state, action: { type: string; payload: string }) => ({
      ...state,
      active: action.payload,
    }),
  },
});

export const {
  reducer: colors,
  actions: { changeActiveColor: changeActiveColorAction },
} = colorSlice;

export const selectActiveColor = (state: RootState) => state.colors.active;
