import React from 'react';
import { DayBlockStyled } from './styles';
import { useSelector } from 'react-redux';
import {
  setBlockColorAction,
  selectBlockColor,
  selectCurrentBlockId,
} from '../../reducers/blocks';
import { selectActiveColor } from '../../reducers/colors';
import { useReduxAction } from '../../utils/redux';

type Props = {
  active: boolean;
  id: number;
};

export const DayBlock = ({ active, id }: Props) => {
  const setBlockColor = useReduxAction(setBlockColorAction);
  const currentBlockId = useSelector(selectCurrentBlockId);
  const currentBlockColor = useSelector(selectBlockColor(id));
  const activeColor = useSelector(selectActiveColor);

  return (
    <DayBlockStyled
      onClick={() => {
        setBlockColor({ id, color: activeColor });
      }}
      color={currentBlockColor}
      active={currentBlockId === id}
    />
  );
};
