import React from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { selectActions } from '../../reducers/actions';
import { Action } from './Action';
import { StyledActionsList } from './styles';

export const DailyBudget = () => {
  const actions = useSelector(selectActions);

  return (
    <>
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
