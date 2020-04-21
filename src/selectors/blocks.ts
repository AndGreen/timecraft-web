import { RootState } from '../reducers';

export const selectCurrentBlockId = (state: RootState) => state.blocks.current;
export const selectBlockColor = (id: number) => (state: RootState) =>
  state.blocks.colors[id];
