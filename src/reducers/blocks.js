import { createSlice } from '@reduxjs/toolkit';
import { getCurrentBlockID } from '../utils/time';

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
  actions: { updateCurrent: updateCurrentReduce },
} = blocksSlice;

export const selectCurrentBlockId = (state) => state.blocks.current;
