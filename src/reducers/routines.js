import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadState } from '../utils/localstorage';
import { updateRoutines } from '../api/firebase';
import { syncDataThunk } from './user';

export const updateRoutinesThunk = createAsyncThunk(
  '/routines/update',
  async (_, ThunkAPI) => {
    const state = ThunkAPI.getState();
    const {
      user: { profile },
      actions: { list },
    } = state;

    await updateRoutines(profile, list);
  },
);

const localStoreRoutines = loadState('routines');
const routinesSlice = createSlice({
  name: 'routines',
  initialState: {
    list: localStoreRoutines ? [...localStoreRoutines] : [],
    editRoutineId: null,
    active: {},
  },
  reducers: {
    setEditRoutineIdReduce: (state, action) => {
      state.editRoutineId = action.payload;
    },
    setRoutinesReduce: (state, action) => {
      state.list = action.payload;
    },
    setActiveRoutineReduce: (state, action) => {
      state.active = action.payload;
    },
  },
  extraReducers: {
    [syncDataThunk.fulfilled]: (state, action) => {
      state.list = action.payload.routines;
    },
  },
});

export const {
  actions: {
    setEditRoutineIdReduce,
    setRoutinesReduce,
    setActiveRoutineReduce,
  },
  reducer: routines,
} = routinesSlice;

export const selectRoutines = (state) => state.routines.list;
export const selectEditRoutineId = (state) => state.routines.editRoutineId;
export const selectActiveRoutine = (state) => state.routines.active;
