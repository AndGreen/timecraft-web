import React from 'react';
import { DayGridWrapper, Line, Label } from './styles';
import { DayBlock } from '../DayBlock';
import { useSelector } from 'react-redux';
import { useCurrentBlockRerender } from '../../utils/hooks';
import { selectRoutines } from '../../reducers/routines';

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

const getColorListByRoutines = (routines) => {
  const colors = {};
  routines.forEach((item) => {
    colors[item.id] = item.color;
  });
  return colors;
};

export const DayGrid = ({ days }) => {
  const routines = useSelector(selectRoutines);
  const colorsMap = getColorListByRoutines(routines);

  useCurrentBlockRerender();

  return (
    <DayGridWrapper>
      {days.map((line, lineNum) => (
        <Line key={`day-line-${lineNum}`}>
          <Label>{linesLabels[lineNum]}</Label>
          {line.map((day, i) => (
            <DayBlock
              id={lineNum * 9 + i}
              key={`day-block-${lineNum}-${i}`}
              active={lineNum === 2 && i === 4}
              colorsMap={colorsMap}
            />
          ))}
        </Line>
      ))}
    </DayGridWrapper>
  );
};
