import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCurrentBlockID } from '../utils/time';

const blocksSlice = createSlice({
  name: 'blocks',
  initialState: {
    current: getCurrentBlockID(),
    colors: [...new Array<string>(72)],
  },
  reducers: {
    updateCurrent: (state) => ({
      ...state,
      current: getCurrentBlockID(),
    }),
    setBlockColor: (
      state,
      action: PayloadAction<{ id: number; color: string }>,
    ) => ({
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
