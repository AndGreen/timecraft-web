import { useEffect, useCallback, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { updateCurrentReduce } from '../reducers/blocks';
import { useRedux, useReduxAction } from './redux';
import { blockDuration, nearBlockDiff } from './time';
import {
  selectOpenedPickerName,
  togglePickerNameReduce,
} from '../reducers/picker';
import { useSelector } from 'react-redux';
import { colors } from '../types/colors';
import {
  selectRoutines,
  setRoutinesReduce,
  setEditRoutineIdReduce,
} from '../reducers/routines';

export const useCurrentBlockRerender = () => {
  const updateCurrentBlock = useReduxAction(updateCurrentReduce);

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
  const togglePickerStatus = useReduxAction(togglePickerNameReduce);
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

export const useCreateNewRoutine = () => {
  const [routines, setRoutines] = useRedux(selectRoutines, setRoutinesReduce);
  const setEditRoutineId = useReduxAction(setEditRoutineIdReduce);

  const newRoutineId = uuid();

  return () => {
    setRoutines([
      ...routines,
      {
        id: newRoutineId,
        title: 'new routine',
        color: colors.grey,
        isNew: true,
      },
    ]);
    setEditRoutineId(newRoutineId);
  };
};

export function useDoubleTap(callback, onSingleTap, threshold = 200) {
  const timer = useRef(null);
  const handler = useCallback(
    (event) => {
      if (!timer.current) {
        timer.current = setTimeout(() => {
          if (onSingleTap) {
            onSingleTap(event);
          }
          timer.current = null;
        }, threshold);
      } else {
        clearTimeout(timer.current);
        timer.current = null;
        callback && callback(event);
      }
    },
    [callback, threshold, onSingleTap],
  );

  return callback
    ? {
        onClick: handler,
      }
    : {};
}
