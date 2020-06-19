import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { selectRoutines } from '../../reducers/routines';
import { Routine } from './Routine';
import { StyledRoutinesList, PageTitle } from './styles';

export const BudgetList = () => {
  const routines = useSelector(selectRoutines);

  return (
    <>
      <PageTitle>Daily budget</PageTitle>
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
