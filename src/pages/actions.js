import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { Title } from '../components/Title';
import { Page } from '../components/Page';
import { theme } from '../styles';
import { isEmpty } from 'lodash';

import styled from 'styled-components';
import { colors, removedColor } from '../types/colors';
import { ColorBlock, ColorList } from '../components/ColorPicker/styles';

const NewActionButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
  cursor: pointer;
  background: ${(p) => p.border && theme.colors.subBackground};
  color: ${theme.colors.font};
`;

const ActionsList = styled.div``;
const StyledAction = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  border: 1px solid ${theme.colors.subBackground};
  display: flex;
  height: 36px;
  align-items: center;
  padding-left: 36px;
  color: ${theme.colors.font};

  :not(:first-child) {
    border-top: none;
  }

  &:before {
    display: block;
    position: absolute;
    content: '';
    width: 12px;
    height: 12px;
    left: 12px;
    top: 12px;

    background-color: ${(p) => p.color};
  }
`;

const ActionMenu = styled.div`
  display: flex;
`;
const ActionMenuItem = styled.div`
  padding-right: 15px;
  font-size: 12px;
  color: ${(p) => (p.cancelType ? theme.colors.contrast : theme.colors.main)};
  cursor: pointer;
`;

const ActionTitleInput = styled.input`
  background: none;
  padding: 0;
  border: none;
  color: ${theme.colors.font};
  width: 100%;
  margin-right: 15px;
`;

const focusRef = (ref) => {
  ref.current && ref.current.focus();
};

const Action = ({
  id,
  editActionId,
  color,
  title,
  isNew,
  onEdit,
  onCancel,
  onRemove,
  onSave,
}) => {
  const isEdit = id === editActionId;
  const inputRef = useRef(null);
  const [newAction, setNewAction] = useState({ id, title, color });

  useEffect(() => {
    if (isEdit) focusRef(inputRef);
  }, [isEdit]);

  const renderMenu = () => {
    if (editActionId && isEdit) {
      return (
        <ActionMenu>
          <ActionMenuItem
            onClick={() => {
              isNew ? onRemove() : onCancel();
            }}
            cancelType
          >
            cancel
          </ActionMenuItem>
          <ActionMenuItem
            onClick={() => {
              onSave(newAction);
            }}
          >
            save
          </ActionMenuItem>
        </ActionMenu>
      );
    }
    if (!editActionId && !isEdit) {
      return (
        <ActionMenu>
          <ActionMenuItem
            onClick={() => {
              onRemove();
            }}
            cancelType
          >
            remove
          </ActionMenuItem>
          <ActionMenuItem
            onClick={() => {
              onEdit();
            }}
          >
            edit
          </ActionMenuItem>
        </ActionMenu>
      );
    }
    return null;
  };
  return (
    <>
      <StyledAction color={newAction.color}>
        {isEdit ? (
          <ActionTitleInput
            onChange={(e) => {
              setNewAction({ ...newAction, title: e.currentTarget.value });
            }}
            ref={inputRef}
            defaultValue={title}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSave(newAction);
              }
            }}
          />
        ) : (
          newAction.title
        )}
        {renderMenu()}
      </StyledAction>
      {isEdit && (
        <ColorList>
          {Object.keys(colors).map((colorName) => (
            <ColorBlock
              key={colorName}
              color={colors[colorName]}
              onClick={() => {
                focusRef(inputRef);
                setNewAction({ ...newAction, color: colors[colorName] });
              }}
            />
          ))}
        </ColorList>
      )}
    </>
  );
};

export const Actions = () => {
  const [editActionId, setEditActionId] = useState(null);
  const [actions, setActions] = useState([
    { id: '1', title: 'read bible', color: colors.brown },
    { id: '2', title: 'sleep', color: colors.teal },
  ]);

  return (
    <Page title={<Title>Timecraft</Title>}>
      {!isEmpty(actions) && (
        <ActionsList>
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
        </ActionsList>
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
    </Page>
  );
};
