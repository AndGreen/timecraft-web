import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pullData as pullDataRest, pushData } from '../api/firebase';
import { removedColor } from '../types/colors';
import Automerge from 'automerge';

export const syncDataThunk = createAsyncThunk(
  'user/data/sync',
  async (_, ThunkAPI) => {
    const state = ThunkAPI.getState();
    const { profile } = state.user;

    // 1 pull
    const pullData = await pullDataRest(profile);
    const { data } = pullData.exists ? pullData.data() : {};
    const { archive } = state.days;

    const server = Automerge.from(data);
    const client = Automerge.from(archive);

    // 2 merge
    const mergedData = {};
    const merged = Automerge.merge(server, client);
    Object.keys(merged).map((day) => (mergedData[day] = merged[day]));

    // 3 push
    await pushData(profile, mergedData);
    return { data: mergedData, sync_date: String(new Date()) };
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    sync_date: '',
  },
  reducers: {
    setProfile: (state, action) => ({ ...state, profile: action.payload }),
  },
  extraReducers: {
    [syncDataThunk.fulfilled]: (state, action) => ({
      ...state,
      sync_date: action.payload && action.payload.sync_date,
    }),
  },
});

export const {
  reducer: user,
  actions: { setProfile: setProfileAction },
} = userSlice;

export const selectSyncDate = (state) => state.user.sync_date;
export const selectProfile = (state) => state.user.profile;
