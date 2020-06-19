import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { selectRoutines } from '../../reducers/routines';
import { Routine } from './Routine';
import { StyledRoutinesList, DoneBadge, BudgetButton } from './styles';
import { selectDailyBudget } from '../../reducers/budgets';
import { selectActiveDay, selectArchive } from '../../reducers/days';
import { useHistory } from 'react-router-dom';

export const DailyBudget = () => {
  const routines = useSelector(selectRoutines);
  const budget = useSelector(selectDailyBudget);
  const activeDay = useSelector(selectActiveDay);
  const archive = useSelector(selectArchive);
  const [counts, setCounts] = useState({ ...budget });
  const [done, setDone] = useState(0);
  const budgetLength = Object.keys(budget).length;
  const history = useHistory();

  useEffect(() => {
    if (budgetLength) {
      const newCounts = { ...counts };
      routines.forEach((routine) => {
        if (budget[routine.id]) newCounts[routine.id] = 0;
      });
      archive[activeDay].forEach((block) => {
        if (newCounts[block] >= 0) {
          newCounts[block]++;
        }
      });

      let newDone = 0;
      Object.keys(budget).forEach((id) => {
        if (newCounts[id] >= budget[id]) newDone++;
      });

      setDone(newDone);
      setCounts(newCounts);
    }
  }, [archive]);

  if (!budgetLength)
    return (
      <BudgetButton onClick={() => history.push('/budgets')}>
        + new budget
      </BudgetButton>
    );
  if (done === budgetLength) return <DoneBadge>Well done!</DoneBadge>;
  return (
    !isEmpty(routines) && (
      <StyledRoutinesList>
        {routines.map((item) => {
          if (budget[item.id])
            return (
              <Routine
                key={item.id}
                {...item}
                count={counts[item.id]}
                budget={budget[item.id]}
              />
            );
        })}
      </StyledRoutinesList>
    )
  );
};
