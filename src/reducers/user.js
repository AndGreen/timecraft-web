import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import { pullData as pullDataRest, pushData } from '../api/firebase';
import dayjs from 'dayjs';
import { loadState } from '../utils/localstorage';

const mergeData = (serverData, clientData) => {
  return { ...serverData, ...clientData };
};

export const syncDataThunk = createAsyncThunk(
  'user/data/sync',
  async (_, ThunkAPI) => {
    const state = ThunkAPI.getState();
    const user = state.user.profile;
    // 1 pull
    const pullData = await pullDataRest(user);

    const { data: serverData, syncDate, actions } = pullData.exists
      ? pullData.data()
      : {};
    const serverActions = actions || [];

    const { lastEditDate } = state.user;
    const { list: clientActions } = state.actions;
    const { archive: clientData } = state.days;

    // 2 merge
    let mergedData = { ...serverData };

    const hasChanges = dayjs(lastEditDate).isAfter(dayjs(syncDate));

    Object.keys(clientData).forEach((day) => {
      mergedData[day] = clientData[day].map((clientBlock, i) => {
        const serverBlock = mergedData[day] ? mergedData[day][i] : null;
        if (!clientBlock || (clientBlock && serverBlock && !hasChanges))
          return serverBlock;
        return clientBlock;
      });
    });
    let mergedActions = !isEmpty(serverActions) ? serverActions : clientActions;

    // 3 push
    await pushData(user, mergedData, mergedActions);
    return { data: mergedData, actions: mergedActions };
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    lastEditDate: loadState('lastEditDate'),
  },
  reducers: {
    setProfile: (state, action) => ({ ...state, profile: action.payload }),
  },
  extraReducers: {
    // Todo: import reducer type
    'days/setBlockActionReduce': (state, action) => {
      state.lastEditDate = new Date().toISOString();
    },
  },
});

export const {
  reducer: user,
  actions: { setProfile: setProfileAction },
} = userSlice;

export const selectProfile = (state) => state.user.profile;
