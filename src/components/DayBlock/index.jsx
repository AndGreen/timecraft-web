import React from 'react';
import { DayBlockStyled } from './styles';
import { useSelector } from 'react-redux';
import { selectCurrentBlockId } from '../../reducers/blocks';
import {
  selectActiveDay,
  setBlockActionReduce,
  selectBlockAction,
} from '../../reducers/days';
import { useReduxAction } from '../../utils/redux';
import { isToday, isFuture } from '../../utils/time';
import { selectActiveAction } from '../../reducers/actions';
import { useDoubleTap } from '../../utils/hooks';

export const DayBlock = ({ active, id, colorsMap }) => {
  const setBlockAction = useReduxAction(setBlockActionReduce);
  const currentBlockId = useSelector(selectCurrentBlockId);
  const blockActionId = useSelector(selectBlockAction(id));
  const activeAction = useSelector(selectActiveAction);
  const activeDay = useSelector(selectActiveDay);

  const futureDay = isFuture(activeDay);
  const today = isToday(activeDay);
  const futureBlock = currentBlockId < id;
  const future = futureDay || (today && futureBlock);

  const onClick = useDoubleTap(
    () => {
      const hour = Math.floor(id / 3) * 3;
      setBlockAction({ id: hour, action: activeAction.id });
      setBlockAction({ id: hour + 1, action: activeAction.id });
      setBlockAction({ id: hour + 2, action: activeAction.id });
    },
    () => {
      setBlockAction({ id, action: activeAction.id });
    },
  );

  return (
    <DayBlockStyled
      {...onClick}
      future={future}
      color={colorsMap[blockActionId]}
      active={today && currentBlockId === id}
    />
  );
};
