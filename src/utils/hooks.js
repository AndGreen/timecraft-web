import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { updateCurrentAction } from '../reducers/blocks';
import { useRedux, useReduxAction } from './redux';
import { blockDuration, nearBlockDiff } from './time';
import {
  selectOpenedPickerName,
  togglePickerNameAction,
} from '../reducers/picker';
import { useSelector } from 'react-redux';
import { colors } from '../types/colors';
import {
  selectActions,
  setActionsReduce,
  setEditActionIdReduce,
} from '../reducers/actions';

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

export const usePickerCloseOutsideClick = (ref, pickerName) => {
  const togglePickerStatus = useReduxAction(togglePickerNameAction);
  const openedPickerName = useSelector(selectOpenedPickerName);
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      if (openedPickerName === pickerName) togglePickerStatus(pickerName);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [openedPickerName]);
};

export const useCreateNewAction = () => {
  const [actions, setActions] = useRedux(selectActions, setActionsReduce);
  const setEditActionId = useReduxAction(setEditActionIdReduce);

  const newActionId = uuid();

  return () => {
    setActions([
      ...actions,
      {
        id: newActionId,
        title: 'new action',
        color: colors.grey,
        isNew: true,
      },
    ]);
    setEditActionId(newActionId);
  };
};
