import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pullData as pullDataRest, pushData } from '../api/firebase';
import { removedColor } from '../types/colors';

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const syncDataThunk = createAsyncThunk(
  'user/data/sync',
  async (_, ThunkAPI) => {
    // 1 pull
    const pullData = await pullDataRest();
    const { data } = pullData.data();

    // Todo add automerge
    // 2 merge
    const state = ThunkAPI.getState();
    const { archive } = state.days;

    const mergedData = { ...archive, ...data };
    data &&
      Object.keys(data).forEach((key) => {
        if (archive[key]) {
          mergedData[key] = archive[key].map((block, i) => {
            if (block === removedColor) return null;
            if (mergedData[key][i]) return mergedData[key][i];
            return block || null;
          });
        }
      });
    // 3 push
    await pushData(mergedData);
    return { data: mergedData, sync_date: String(new Date()) };
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    sync_date: '',
  },
  reducers: {},
  extraReducers: {
    [syncDataThunk.fulfilled]: (state, action) => ({
      ...state,
      sync_date: action.payload && action.payload.sync_date,
    }),
  },
});

export const {
  reducer: user,
  actions: {},
} = userSlice;

export const selectSyncDate = (state) => state.user.sync_date;
