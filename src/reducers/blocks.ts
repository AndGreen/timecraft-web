import { createSlice } from '@reduxjs/toolkit';
import { getCurrentBlockID } from '../utils/time';

const blocksSlice = createSlice({
  name: 'blocks',
  initialState: { current: getCurrentBlockID() },
  reducers: {},
});

export const { reducer: blocks } = blocksSlice;
