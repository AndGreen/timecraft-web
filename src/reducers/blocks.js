import { createSlice } from '@reduxjs/toolkit';
import { getCurrentBlockID } from '../utils/time';
import { selectActiveDayColors } from './days';

const blocksSlice = createSlice({
  name: 'blocks',
  initialState: {
    current: getCurrentBlockID(),
    colors: [...new Array(72)],
  },
  reducers: {
    updateCurrent: (state) => ({
      ...state,
      current: getCurrentBlockID(),
    }),
    setBlockColor: (state, action) => ({
      ...state,
      colors: state.colors.map((item, id) =>
        id === action.payload.id ? action.payload.color : item,
      ),
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
