import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadState } from '../utils/localstorage';
import { updateActions } from '../api/firebase';
import { syncDataThunk } from './user';

export const updateActionsThunk = createAsyncThunk(
  '/actions/update',
  async (_, ThunkAPI) => {
    const state = ThunkAPI.getState();
    const {
      user: { profile },
      actions: { list },
    } = state;

    await updateActions(profile, list);
  },
);

const localStoreActions = loadState('actions');
const actionsSlice = createSlice({
  name: 'actions',
  initialState: {
    list: localStoreActions ? [...localStoreActions] : [],
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
  extraReducers: {
    [syncDataThunk.fulfilled]: (state, action) => {
      state.list = action.payload.actions;
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
