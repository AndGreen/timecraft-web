import { createSlice } from '@reduxjs/toolkit';

const blocksSlice = createSlice({
  name: 'blocks',
  initialState: [],
  reducers: {},
});

export const { reducer: blocks } = blocksSlice;
