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
    setActiveDayAction: (state, action) => {
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
    setBlockActionReduce: (state, action) => {
      state.archive = {
        ...state.archive,
        [state.active]: state.archive[state.active].map((item, id) => {
          if (id === action.payload.id) {
            return action.payload.action ? action.payload.action : 'removed';
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
  actions: { setActiveDayAction, setBlockActionReduce },
} = daysSlice;

export const selectActiveDay = (state) => state.days.active;
export const selectActiveDayActions = (state) =>
  state.days.archive[state.days.active];
export const selectBlockAction = (id) => (state) =>
  selectActiveDayActions(state)[id];
