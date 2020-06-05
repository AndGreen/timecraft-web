import React from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { useReduxAction } from '../../utils/redux';
import { useCreateNewAction } from '../../utils/hooks';
import {
  selectActions,
  selectEditActionId,
  setActionsReduce,
  setEditActionIdReduce,
  updateActionsThunk,
} from '../../reducers/actions';
import { Action } from './Action';
import { StyledActionsList, NewActionButton } from './styles';

export const ActionsList = () => {
  const editActionId = useSelector(selectEditActionId);
  const setEditActionId = useReduxAction(setEditActionIdReduce);
  const updateActionsAsync = useReduxAction(updateActionsThunk);
  const actions = useSelector(selectActions);
  const setActions = useReduxAction(setActionsReduce);
  const createNewAction = useCreateNewAction();

  return (
    <>
      {!isEmpty(actions) && (
        <StyledActionsList>
          {actions.map((item) => (
            <Action
              id={item.id}
              editActionId={editActionId}
              key={item.id}
              color={item.color}
              title={item.title}
              isNew={Boolean(item.isNew)}
              onEdit={() => {
                setEditActionId(item.id);
              }}
              onCancel={() => {
                setEditActionId(null);
              }}
              onRemove={() => {
                const updatedActions = actions.filter(
                  (action) => item.id !== action.id,
                );
                setActions(updatedActions);
                updateActionsAsync(updatedActions);
                setEditActionId(null);
              }}
              onSave={(newAction) => {
                const updatedActions = actions.map((action) => {
                  return action.id === editActionId ? newAction : action;
                });
                setActions(updatedActions);
                updateActionsAsync(updatedActions);
                setEditActionId(null);
              }}
            />
          ))}
        </StyledActionsList>
      )}
      {!editActionId && (
        <NewActionButton
          border={isEmpty(actions)}
          onClick={() => {
            createNewAction();
          }}
        >
          + new actions
        </NewActionButton>
      )}
    </>
  );
};
