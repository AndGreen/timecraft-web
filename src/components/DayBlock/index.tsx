import React from 'react';
import { DayBlockStyled } from './styles';

type Props = {
  active: boolean;
};

export const DayBlock = ({ active }: Props) => (
  <DayBlockStyled active={active} />
);
