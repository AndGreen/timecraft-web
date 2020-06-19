import { createSlice } from '@reduxjs/toolkit';
import { createEmptyColorsArr } from '../utils/time';
import { loadState } from '../utils/localstorage';
import { syncDataThunk } from './user';

const currentDay = new Date().toLocaleDateString('en');

const daysSlice = createSlice({
  name: 'days',
  initialState: {
    active: currentDay,
    archive: {
      [currentDay]: createEmptyColorsArr(),
      ...loadState('days'),
    },
  },
  reducers: {
    setActiveDayRoutine: (state, action) => {
      const selectedDay = action.payload;
      return {
        ...state,
        active: selectedDay,
        archive: {
          ...state.archive,
          [selectedDay]: state.archive[selectedDay] || createEmptyColorsArr(),
        },
      };
    },
    setBlockRoutineReduce: (state, action) => {
      state.archive = {
        ...state.archive,
        [state.active]: state.archive[state.active].map((item, id) => {
          if (id === action.payload.id) {
            return action.payload.routine ? action.payload.routine : 'removed';
          }
          return item;
        }),
      };
    },
  },
  extraReducers: {
    [syncDataThunk.fulfilled]: (state, action) => ({
      ...state,
      archive: action.payload.data,
    }),
  },
});

export const {
  reducer: days,
  actions: { setActiveDayRoutine, setBlockRoutineReduce },
} = daysSlice;

export const selectActiveDay = (state) => state.days.active;
export const selectActiveDayRoutines = (state) =>
  state.days.archive[state.days.active];
export const selectBlockRoutine = (id) => (state) =>
  selectActiveDayRoutines(state)[id];
export const selectArchive = (state) => state.days.archive;
