import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pullData as pullDataRest, pushData } from '../api/firebase';
import dayjs from 'dayjs';
import { loadState } from '../utils/localstorage';

export const syncDataThunk = createAsyncThunk(
  'user/data/sync',
  async (_, ThunkAPI) => {
    const state = ThunkAPI.getState();
    const { profile } = state.user;

    // 1 pull
    const pullData = await pullDataRest(profile);
    const {
      data: serverData,
      syncDate: serverSyncDate,
      actions,
    } = pullData.exists ? pullData.data() : {};
    const serverActions = actions || [];
    const { syncDate } = state.user;
    const { list: clientActions } = state.actions;
    const { archive: clientData } = state.days;

    // 2 merge
    const noOtherDevicesChanges = dayjs(syncDate).isSame(dayjs(serverSyncDate));

    let mergedData =
      syncDate && noOtherDevicesChanges
        ? { ...serverData, ...clientData }
        : { ...serverData };

    let mergedActions = clientActions || serverActions;

    // if (noOtherDevicesChanges) {
    // Object.keys(clientData).forEach((day) => {
    //   mergedData[day] = clientData[day].map((clientBlock, i) => {
    //     if (!clientBlock) return serverData[day][i];
    //     return clientBlock;
    //   });
    // });
    // }

    // 3 push
    const newSyncDate = new Date().toISOString();
    await pushData(newSyncDate, profile, mergedData, mergedActions);
    return { data: mergedData, actions: mergedActions, syncDate: newSyncDate };
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    syncDate: loadState('syncDate'),
  },
  reducers: {
    setProfile: (state, action) => ({ ...state, profile: action.payload }),
  },
  extraReducers: {
    [syncDataThunk.fulfilled]: (state, action) => ({
      ...state,
      syncDate: action.payload && action.payload.syncDate,
    }),
  },
});

export const {
  reducer: user,
  actions: { setProfile: setProfileAction },
} = userSlice;

export const selectSyncDate = (state) => state.user.syncDate;
export const selectProfile = (state) => state.user.profile;
