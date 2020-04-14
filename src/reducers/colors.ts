import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const colorSlice = createSlice({
  name: 'colors',
  initialState: { isPickerOpened: false, active: null },
  reducers: {
    togglePickerStatus: (state) => ({
      ...state,
      isPickerOpened: !state.isPickerOpened,
    }),
  },
});

export const { reducer: colors } = colorSlice;
export const {
  togglePickerStatus: togglePickerStatusAction,
} = colorSlice.actions;
