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

  return (
    <DayBlockStyled
      onClick={() => {
        setBlockAction({ id, action: activeAction.id });
      }}
      future={future}
      color={colorsMap[blockActionId]}
      active={today && currentBlockId === id}
    />
  );
};
