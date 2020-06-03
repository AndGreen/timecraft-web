import { createSlice } from '@reduxjs/toolkit';

const actionsSlice = createSlice({
  name: 'actions',
  initialState: {
    list: [{ id: '1', title: 'read bible', color: 'blue' }],
    colors: { '1': 'red' },
  },
  reducers: {},
});

export const { reducer: actions } = actionsSlice;
