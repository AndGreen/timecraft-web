import React from 'react';
import { DayBlockStyled } from './styles';
import { useSelector } from 'react-redux';
import { selectCurrentBlockId } from '../../selectors/blocks';

type Props = {
  active: boolean;
  id: number;
};

export const DayBlock = ({ active, id }: Props) => {
  const currentBlockId = useSelector(selectCurrentBlockId);
  return <DayBlockStyled active={currentBlockId === id} />;
};
