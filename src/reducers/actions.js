import { createSlice } from '@reduxjs/toolkit';
import { colors } from '../types/colors';
import { loadState } from '../utils/localstorage';

const actionsSlice = createSlice({
  name: 'actions',
  initialState: {
    list: [...loadState('actions')],
    editActionId: null,
  },
  reducers: {
    setEditActionIdReduce: (state, action) => {
      state.editActionId = action.payload;
    },
    setActionsReduce: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const {
  actions: { setEditActionIdReduce, setActionsReduce },
  reducer: actions,
} = actionsSlice;

export const selectActions = (state) => state.actions.list;
export const selectEditActionId = (state) => state.actions.editActionId;
