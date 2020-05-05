import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { createEmptyColorsArr } from '../utils/time';
import { loadState } from '../utils/localstorage';
import { syncDataThunk } from './user';

interface Days {
  [key: string]: string[];
}

const currentDay = new Date().toLocaleDateString('en');

const daysSlice = createSlice({
  name: 'days',
  initialState: {
    active: currentDay,
    archive: {
      [currentDay]: createEmptyColorsArr(),
      ...loadState('days'),
    } as Days,
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
    setBlockColor: (
      state,
      action: PayloadAction<{ id: number; color: string }>,
    ) => {
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
  extraReducers: (builder) => {
    builder.addCase(syncDataThunk.fulfilled, (state, action) => ({
      ...state,
      archive: action.payload.data,
    }));
  },
});

export const {
  reducer: days,
  actions: {
    setActiveDay: setActiveDayAction,
    setBlockColor: setBlockColorAction,
  },
} = daysSlice;

export const selectActiveDay = (state: RootState) => state.days.active;
export const selectActiveDayColors = (state: RootState) =>
  state.days.archive[state.days.active];
export const selectDaysArchive = (state: RootState) => state.days.archive;
