import React from 'react';
import { DayBlockStyled } from './styles';
import { useSelector } from 'react-redux';
import { selectCurrentBlockId } from '../../reducers/blocks';
import {
  selectActiveDay,
  setBlockRoutineReduce,
  selectBlockRoutine,
} from '../../reducers/days';
import { useReduxAction } from '../../utils/redux';
import { isToday, isFuture } from '../../utils/time';
import { selectActiveRoutine } from '../../reducers/routines';
import { useDoubleTap } from '../../utils/hooks';

export const DayBlock = ({ active, id, colorsMap }) => {
  const setBlockRoutine = useReduxAction(setBlockRoutineReduce);
  const currentBlockId = useSelector(selectCurrentBlockId);
  const blockRoutineId = useSelector(selectBlockRoutine(id));
  const activeRoutine = useSelector(selectActiveRoutine);
  const activeDay = useSelector(selectActiveDay);

  const futureDay = isFuture(activeDay);
  const today = isToday(activeDay);
  const futureBlock = currentBlockId < id;
  const future = futureDay || (today && futureBlock);

  const onClick = useDoubleTap(
    () => {
      const hour = Math.floor(id / 3) * 3;
      setBlockRoutine({ id: hour, routine: activeRoutine.id });
      setBlockRoutine({ id: hour + 1, routine: activeRoutine.id });
      setBlockRoutine({ id: hour + 2, routine: activeRoutine.id });
    },
    () => {
      setBlockRoutine({ id, routine: activeRoutine.id });
    },
  );

  return (
    <DayBlockStyled
      {...onClick}
      future={future}
      color={colorsMap[blockRoutineId]}
      active={today && currentBlockId === id}
    />
  );
};
