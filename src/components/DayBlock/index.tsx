import React from 'react';
import { DayBlockStyled } from './styles';

type Props = {
  key: string;
  active: boolean;
};

export const DayBlock = ({ key, active }: Props) => (
  <DayBlockStyled key={key} active={active} />
);
