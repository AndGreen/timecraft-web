import React from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { useReduxAction } from '../../utils/redux';
import { useCreateNewRoutine } from '../../utils/hooks';
import {
  selectRoutines,
  selectEditRoutineId,
  setRoutinesReduce,
  setEditRoutineIdReduce,
  updateRoutinesThunk,
} from '../../reducers/routines';
import { Routine } from './Routine';
import { StyledRoutinesList, NewRoutineButton } from './styles';

export const RoutinesList = () => {
  const editRoutineId = useSelector(selectEditRoutineId);
  const setEditRoutineId = useReduxAction(setEditRoutineIdReduce);
  const updateRoutinesAsync = useReduxAction(updateRoutinesThunk);
  const routines = useSelector(selectRoutines);
  const setRoutines = useReduxAction(setRoutinesReduce);
  const createNewRoutine = useCreateNewRoutine();

  return (
    <>
      {!isEmpty(routines) && (
        <StyledRoutinesList>
          {routines.map((item) => (
            <Routine
              id={item.id}
              editRoutineId={editRoutineId}
              key={item.id}
              color={item.color}
              title={item.title}
              isNew={Boolean(item.isNew)}
              onEdit={() => {
                setEditRoutineId(item.id);
              }}
              onCancel={() => {
                setEditRoutineId(null);
              }}
              onRemove={() => {
                const updatedRoutines = routines.filter(
                  (routine) => item.id !== routine.id,
                );
                setRoutines(updatedRoutines);
                updateRoutinesAsync(updatedRoutines);
                setEditRoutineId(null);
              }}
              onSave={(newRoutine) => {
                const updatedRoutines = routines.map((routine) => {
                  return routine.id === editRoutineId ? newRoutine : routine;
                });
                setRoutines(updatedRoutines);
                updateRoutinesAsync(updatedRoutines);
                setEditRoutineId(null);
              }}
            />
          ))}
        </StyledRoutinesList>
      )}
      {!editRoutineId && (
        <NewRoutineButton
          border={isEmpty(routines)}
          onClick={() => {
            createNewRoutine();
          }}
        >
          + new routines
        </NewRoutineButton>
      )}
    </>
  );
};
