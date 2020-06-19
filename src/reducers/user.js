import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import { pullData as pullDataRest, pushData } from '../api/firebase';
import dayjs from 'dayjs';
import { loadState } from '../utils/localstorage';

export const syncDataThunk = createAsyncThunk(
  'user/data/sync',
  async (_, ThunkAPI) => {
    const state = ThunkAPI.getState();
    const user = state.user.profile;
    // 1 pull
    const pullData = await pullDataRest(user);

    const { data: serverData, syncDate, routines, budget } = pullData.exists
      ? pullData.data()
      : {};
    const serverRoutines = routines || [];
    const serverBudget = budget || {};

    const { lastEditDate } = state.user;
    const { list: clientRoutines } = state.routines;
    const { archive: clientData } = state.days;
    const { daily: clientBudget } = state.budgets;

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
    let mergedRoutines = !isEmpty(serverRoutines) ? serverRoutines : clientRoutines;
    let mergedBudgets = !isEmpty(serverBudget) ? serverBudget : clientBudget;

    // 3 push
    await pushData(user, mergedData, mergedRoutines);
    return { data: mergedData, routines: mergedRoutines, budgets: mergedBudgets };
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
    'days/setBlockRoutineReduce': (state, action) => {
      state.lastEditDate = new Date().toISOString();
    },
  },
});

export const {
  reducer: user,
  actions: { setProfile: setProfileReduce },
} = userSlice;

export const selectProfile = (state) => state.user.profile;
