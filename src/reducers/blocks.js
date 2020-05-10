import { createSlice } from '@reduxjs/toolkit';
import { getCurrentBlockID } from '../utils/time';
import { selectActiveDayColors } from './days';

const blocksSlice = createSlice({
  name: 'blocks',
  initialState: {
    current: getCurrentBlockID(),
  },
  reducers: {
    updateCurrent: (state) => ({
      ...state,
      current: getCurrentBlockID(),
    }),
  },
});

export const {
  reducer: blocks,
  actions: {
    updateCurrent: updateCurrentAction,
    setBlockColor: setBlockColorAction,
  },
} = blocksSlice;

export const selectCurrentBlockId = (state) => state.blocks.current;
export const selectBlockColor = (id) => (state) =>
  selectActiveDayColors(state)[id];
