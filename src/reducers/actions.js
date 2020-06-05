import { createSlice } from '@reduxjs/toolkit';
import { loadState } from '../utils/localstorage';

const actionsSlice = createSlice({
  name: 'actions',
  initialState: {
    list: [...loadState('actions')],
    editActionId: null,
    active: {},
  },
  reducers: {
    setEditActionIdReduce: (state, action) => {
      state.editActionId = action.payload;
    },
    setActionsReduce: (state, action) => {
      state.list = action.payload;
    },
    setActiveActionReduce: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const {
  actions: { setEditActionIdReduce, setActionsReduce, setActiveActionReduce },
  reducer: actions,
} = actionsSlice;

export const selectActions = (state) => state.actions.list;
export const selectEditActionId = (state) => state.actions.editActionId;
export const selectActiveAction = (state) => state.actions.active;
