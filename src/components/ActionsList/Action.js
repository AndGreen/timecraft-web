import React, { useState, useEffect, useRef } from 'react';
import { colors } from '../../types/colors';
import {
  ActionTitleInput,
  ActionMenu,
  ActionMenuItem,
  StyledAction,
  ColorList,
  ColorBlock,
  Text
} from './styles';

const focusRef = (ref) => {
  ref.current && ref.current.focus();
};

export const Action = ({
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
          <Text>{newAction.title}</Text>
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
