import { useEffect } from 'react';
import { updateCurrentAction } from '../reducers/blocks';
import { useReduxAction } from './redux';
import { blockDuration, nearBlockDiff } from './time';

export const useCurrentBlockRerender = () => {
  const updateCurrentBlock = useReduxAction(updateCurrentAction);

  useEffect(() => {
    setTimeout(() => {
      updateCurrentBlock();
      setInterval(() => {
        updateCurrentBlock();
      }, 1000 * blockDuration);
    }, nearBlockDiff * 1000 + 1000);
  });
};
