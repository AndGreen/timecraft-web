import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { selectActions } from '../../reducers/actions';
import { Action } from './Action';
import { StyledActionsList, PageTitle } from './styles';

export const BudgetList = () => {
  const actions = useSelector(selectActions);

  return (
    <>
      <PageTitle>Daily budget</PageTitle>
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
