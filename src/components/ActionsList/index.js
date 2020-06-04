import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { colors } from '../../types/colors';
import { useReduxAction } from '../../utils/redux';
import {
  selectActions,
  selectEditActionId,
  setActionsReduce,
  setEditActionIdReduce,
} from '../../reducers/actions';
import { Action } from './Action';
import { StyledActionsList, NewActionButton } from './styles';

export const ActionsList = () => {
  const editActionId = useSelector(selectEditActionId);
  const setEditActionId = useReduxAction(setEditActionIdReduce);
  const actions = useSelector(selectActions);
  const setActions = useReduxAction(setActionsReduce);

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
                setActions(actions.filter((action) => item.id !== action.id));
                setEditActionId(null);
              }}
              onSave={(newAction) => {
                setActions(
                  actions.map((action) => {
                    return action.id === editActionId ? newAction : action;
                  }),
                );
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
            const newActionId = uuid();
            setActions([
              ...actions,
              {
                id: newActionId,
                title: 'new action',
                color: colors.grey,
                isNew: true,
              },
            ]);
            setEditActionId(newActionId);
          }}
        >
          + new actions
        </NewActionButton>
      )}
    </>
  );
};
