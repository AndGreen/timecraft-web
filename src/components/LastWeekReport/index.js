import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { selectActions } from '../../reducers/actions';
import { Action } from './Action';
import { StyledActionsList, PageTitle } from './styles';
import { getLastWeekDays } from '../../utils/time';
import { selectArchive } from '../../reducers/days';

export const LastWeekReport = () => {
  const actionList = useSelector(selectActions);
  const [actions, setActions] = useState(
    actionList.map((action) => ({ ...action, count: 0, share: 0 })),
  );
  const archive = useSelector(selectArchive);

  useEffect(() => {
    let summary = 0;
    const week = getLastWeekDays();
    const actionsIds = {};
    const newActions = [...actions];
    // actions ids map
    newActions.forEach((action, key) => {
      actionsIds[action.id] = key;
    });
    // count actions
    week.forEach((day) => {
      if (archive[day]) {
        archive[day].forEach((block) => {
          if (block && actionsIds[block] >= 0) {
            summary++;
            newActions[actionsIds[block]].count++;
          }
        });
      }
    });
    // update shares and sort
    if (summary) {
      newActions.forEach((action) => {
        action.share = Math.floor((action.count / summary) * 100);
      });
      newActions.sort((actionA, actionB) => actionB.count - actionA.count);
    }

    setActions(newActions);
  }, []);

  return (
    <>
      <PageTitle>Last week</PageTitle>
      {!isEmpty(actions) && (
        <StyledActionsList>
          {actions.map((item) => (
            <Action key={item.id} {...item} />
          ))}
        </StyledActionsList>
      )}
    </>
  );
};
