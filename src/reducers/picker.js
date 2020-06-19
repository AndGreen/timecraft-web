import { createSlice } from '@reduxjs/toolkit';

const pickerSlice = createSlice({
  name: 'pickers',
  initialState: {
    name: '',
  },
  reducers: {
    togglePickerName: (state, action) => ({
      ...state,
      name: action.payload === state.name ? '' : action.payload,
    }),
  },
});

export const {
  reducer: picker,
  actions: { togglePickerName: togglePickerNameReduce },
} = pickerSlice;

export const selectOpenedPickerName = (state) => state.picker.name;
export const selectIsPickerOpened = (state) => state.picker.name !== '';
