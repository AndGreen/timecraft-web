import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';

const pickerSlice = createSlice({
  name: 'pickers',
  initialState: {
    name: '' as string,
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
  actions: { togglePickerName: togglePickerNameAction },
} = pickerSlice;

export const selectOpenedPickerName = (state: RootState) => state.picker.name;
