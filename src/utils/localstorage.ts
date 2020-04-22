import { RootState } from '../reducers';
import { getCurrentBlockID } from './time';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }

    const parsedState = JSON.parse(serializedState);
    return {
      ...parsedState,
      blocks: {
        ...parsedState.blocks,
        current: getCurrentBlockID(),
      },
    };
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: Object) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};
