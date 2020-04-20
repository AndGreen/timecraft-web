import { RootState } from '../reducers';

export const selectCurrentBlockId = (state: RootState) => state.blocks.current;
