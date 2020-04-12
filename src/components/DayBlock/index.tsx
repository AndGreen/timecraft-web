import React from 'react';
import { DayBlockStyled } from './styles';

type Props = {
  key: string;
};

export const DayBlock = ({ key }: Props) => <DayBlockStyled key={key} />;
