import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    sync_date: '',
  },
  reducers: {},
});

export const {
  reducer: user,
  actions: {},
} = userSlice;

export const selectSyncDate = (state: RootState) => state.user.sync_date;
