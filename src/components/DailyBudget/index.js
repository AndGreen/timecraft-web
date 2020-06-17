import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { selectActions } from '../../reducers/actions';
import { Action } from './Action';
import { StyledActionsList, DoneBadge, Wrapper } from './styles';
import { selectDailyBudget } from '../../reducers/budgets';
import { selectActiveDay, selectArchive } from '../../reducers/days';
import { selectIsPickerOpened } from '../../reducers/picker';

export const DailyBudget = () => {
  const actions = useSelector(selectActions);
  const budget = useSelector(selectDailyBudget);
  const activeDay = useSelector(selectActiveDay);
  const archive = useSelector(selectArchive);
  const isPickerOpened = useSelector(selectIsPickerOpened);
  const [counts, setCounts] = useState({ ...budget });
  const [done, setDone] = useState(0);

  useEffect(() => {
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
  }, [archive]);

  if (done === Object.keys(budget).length)
    return (
      <Wrapper disabled={isPickerOpened}>
        <DoneBadge>Well done!</DoneBadge>
      </Wrapper>
    );

  return (
    <Wrapper disabled={isPickerOpened}>
      {!isEmpty(actions) && (
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
      )}
    </Wrapper>
  );
};
