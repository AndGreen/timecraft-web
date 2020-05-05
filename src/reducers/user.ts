import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './index';
import { userPullDataQuery, userPushDataQuery, request } from '../api/graphql';

export const syncDataThunk = createAsyncThunk(
  'user/data/sync',
  async (customSync: object = {}, ThunkAPI) => {
    // 1 pull
    const pullData = await request(userPullDataQuery);
    const { data } = pullData.users[0];

    // 2 merge
    const state = ThunkAPI.getState() as RootState;
    const { archive } = state.days;
    const mergedData = { ...data, ...archive };

    // 3 push
    const response = await request(userPushDataQuery, {
      data: mergedData,
      sync_date: new Date(),
    });
    const { sync_date } = response.update_users.returning[0];
    return { data: mergedData, sync_date };
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    sync_date: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(syncDataThunk.fulfilled, (state, action) => {
      state.sync_date = action.payload.sync_date;
    });
  },
});

export const {
  reducer: user,
  actions: {},
} = userSlice;

export const selectSyncDate = (state: RootState) => state.user.sync_date;
