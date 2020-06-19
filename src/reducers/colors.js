import { createSlice } from '@reduxjs/toolkit';

const colorSlice = createSlice({
  name: 'colors',
  initialState: {
    active: '',
  },
  reducers: {
    changeActiveColor: (state, action) => ({
      ...state,
      active: action.payload,
    }),
  },
});

export const {
  reducer: colors,
  actions: { changeActiveColor: changeActiveColorRoutine },
} = colorSlice;

export const selectActiveColor = (state) => state.colors.active;
