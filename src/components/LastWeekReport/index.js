import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { selectRoutines } from '../../reducers/routines';
import { Routine } from './Routine';
import { StyledRoutinesList, PageTitle } from './styles';
import { getLastWeekDays } from '../../utils/time';
import { selectArchive } from '../../reducers/days';

export const LastWeekReport = () => {
  const routineList = useSelector(selectRoutines);
  const [routines, setRoutines] = useState(
    routineList.map((routine) => ({ ...routine, count: 0, share: 0 })),
  );
  const archive = useSelector(selectArchive);

  useEffect(() => {
    let summary = 0;
    const week = getLastWeekDays();
    const routinesIds = {};
    const newRoutines = [...routines];
    // routines ids map
    newRoutines.forEach((routine, key) => {
      routinesIds[routine.id] = key;
    });
    // count routines
    week.forEach((day) => {
      if (archive[day]) {
        archive[day].forEach((block) => {
          if (block && routinesIds[block] >= 0) {
            summary++;
            newRoutines[routinesIds[block]].count++;
          }
        });
      }
    });
    // update shares and sort
    if (summary) {
      newRoutines.forEach((routine) => {
        routine.share = Math.floor((routine.count / summary) * 100);
      });
      newRoutines.sort((routineA, routineB) => routineB.count - routineA.count);
    }

    setRoutines(newRoutines);
  }, []);

  return (
    <>
      <PageTitle>Week report</PageTitle>
      {!isEmpty(routines) && (
        <StyledRoutinesList>
          {routines.map((item) => (
            <Routine key={item.id} {...item} />
          ))}
        </StyledRoutinesList>
      )}
    </>
  );
};
