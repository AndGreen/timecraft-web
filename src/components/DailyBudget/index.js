import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { selectActions } from '../../reducers/actions';
import { Action } from './Action';
import { StyledActionsList, DoneBadge, BudgetButton } from './styles';
import { selectDailyBudget } from '../../reducers/budgets';
import { selectActiveDay, selectArchive } from '../../reducers/days';
import { useHistory } from 'react-router-dom';

export const DailyBudget = () => {
  const actions = useSelector(selectActions);
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
      actions.forEach((action) => {
        if (budget[action.id]) newCounts[action.id] = 0;
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
    !isEmpty(actions) && (
      <StyledActionsList>
        {actions.map((item) => {
          if (budget[item.id])
            return (
              <Action
                key={item.id}
                {...item}
                count={counts[item.id]}
                budget={budget[item.id]}
              />
            );
        })}
      </StyledActionsList>
    )
  );
};
