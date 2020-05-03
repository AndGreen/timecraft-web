import React from 'react';
import { DayBlockStyled } from './styles';
import { useSelector } from 'react-redux';
import { selectBlockColor, selectCurrentBlockId } from '../../reducers/blocks';
import { selectActiveColor } from '../../reducers/colors';
import { selectActiveDay, setBlockColorAction } from '../../reducers/days';
import { useReduxAction } from '../../utils/redux';
import { isToday, isFuture } from '../../utils/time';

type Props = {
  active: boolean;
  id: number;
};

export const DayBlock = ({ active, id }: Props) => {
  const setBlockColor = useReduxAction(setBlockColorAction);
  const currentBlockId = useSelector(selectCurrentBlockId);
  const currentBlockColor = useSelector(selectBlockColor(id));
  const activeColor = useSelector(selectActiveColor);
  const activeDay = useSelector(selectActiveDay);

  const futureDay = isFuture(activeDay);
  const today = isToday(activeDay);
  const futureBlock = currentBlockId < id;
  const future = futureDay || (today && futureBlock);

  return (
    <DayBlockStyled
      onClick={() => {
        setBlockColor({ id, color: activeColor });
      }}
      future={future}
      color={currentBlockColor}
      active={today && currentBlockId === id}
    />
  );
};
