import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { v4 as uuid } from 'uuid';
import { colors } from '../../types/colors';
import { Action } from './Action';
import { StyledActionsList, NewActionButton } from './styles';

export const ActionsList = () => {
  const [editActionId, setEditActionId] = useState(null);
  const [actions, setActions] = useState([
    { id: '1', title: 'read bible', color: colors.brown },
    { id: '2', title: 'sleep', color: colors.teal },
  ]);

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
