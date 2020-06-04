import { createSlice } from '@reduxjs/toolkit';
import { colors } from '../types/colors';
import { loadState } from '../utils/localstorage';

const actionsSlice = createSlice({
  name: 'actions',
  initialState: {
    list: [...loadState('actions')],
    editActionId: null,
    activeActionId: null,
  },
  reducers: {
    setEditActionIdReduce: (state, action) => {
      state.editActionId = action.payload;
    },
    setActionsReduce: (state, action) => {
      state.list = action.payload;
    },
    setActiveActionReduce: (state, action) => {
      state.activeActionId = action.payload;
    },
  },
});

export const {
  actions: { setEditActionIdReduce, setActionsReduce, setActiveActionReduce },
  reducer: actions,
} = actionsSlice;

export const selectActions = (state) => state.actions.list;
export const selectEditActionId = (state) => state.actions.editActionId;
export const selectActiveActionId = (state) => state.actions.activeActionId;
