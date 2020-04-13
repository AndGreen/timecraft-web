import React from 'react';
import { DayGridWrapper, Line, Label } from './styles';
import { DayBlock } from '../DayBlock';

type Props = {
  days: string[][];
};

const linesLabels = [
  '00:00',
  '03:00',
  '06:00',
  '09:00',
  '12:00',
  '15:00',
  '18:00',
  '21:00',
];

export const DayGrid = ({ days }: Props) => {
  return (
    <DayGridWrapper>
      {days.map((line, lineNum) => (
        <Line key={`day-line-${lineNum}`}>
          <Label>{linesLabels[lineNum]}</Label>
          {line.map((day, i) => (
            <DayBlock
              key={`day-block-${lineNum}-${i}`}
              active={lineNum === 2 && i === 4}
            />
          ))}
        </Line>
      ))}
    </DayGridWrapper>
  );
};
