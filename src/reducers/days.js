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
    setActiveDay: (state, action) => {
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
    setBlockColor: (state, action) => {
      return {
        ...state,
        archive: {
          ...state.archive,
          [state.active]: state.archive[state.active].map((item, id) =>
            id === action.payload.id ? action.payload.color : item,
          ),
        },
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
  actions: {
    setActiveDay: setActiveDayAction,
    setBlockColor: setBlockColorAction,
  },
} = daysSlice;

export const selectActiveDay = (state) => state.days.active;
export const selectActiveDayColors = (state) =>
  state.days.archive[state.days.active];
export const selectDaysArchive = (state) => state.days.archive;
