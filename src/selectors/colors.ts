import { RootState } from '../reducers';

export const selectPickerStatus = (state: RootState) =>
  state.colors.isPickerOpened;

export const selectActiveColor = (state: RootState) => state.colors.active;
