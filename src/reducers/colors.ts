import { createSlice } from '@reduxjs/toolkit';

const colorSlice = createSlice({
  name: 'colors',
  initialState: {
    isPickerOpened: false as boolean,
    active: '' as string,
  },
  reducers: {
    togglePickerStatus: (state) => ({
      ...state,
      isPickerOpened: !state.isPickerOpened,
    }),
    changeActiveColor: (state, action: { type: string; payload: string }) => ({
      ...state,
      active: action.payload,
    }),
  },
});

export const {
  reducer: colors,
  actions: {
    togglePickerStatus: togglePickerStatusAction,
    changeActiveColor: changeActiveColorAction,
  },
} = colorSlice;
