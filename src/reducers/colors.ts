import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const { reducer: colors } = colorSlice;
export const {
  togglePickerStatus: togglePickerStatusAction,
  changeActiveColor: changeActiveColorAction,
} = colorSlice.actions;
