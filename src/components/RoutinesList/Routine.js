import React, { useState, useEffect, useRef } from 'react';
import { colors } from '../../types/colors';
import {
  RoutineTitleInput,
  RoutineMenu,
  RoutineMenuItem,
  StyledRoutine,
  ColorList,
  ColorBlock,
  Text,
} from './styles';

const focusRef = (ref) => {
  ref.current && ref.current.focus();
  ref.current && ref.current.select();
};

export const Routine = ({
  id,
  editRoutineId,
  color,
  title,
  isNew,
  onEdit,
  onCancel,
  onRemove,
  onSave,
}) => {
  const isEdit = id === editRoutineId;
  const inputRef = useRef(null);
  const [newRoutine, setNewRoutine] = useState({ id, title, color });

  useEffect(() => {
    if (isEdit) focusRef(inputRef);
  }, [isEdit]);

  const renderMenu = () => {
    if (editRoutineId && isEdit) {
      return (
        <RoutineMenu>
          <RoutineMenuItem
            onClick={() => {
              isNew ? onRemove() : onCancel();
            }}
            cancelType
          >
            cancel
          </RoutineMenuItem>
          <RoutineMenuItem
            onClick={() => {
              onSave(newRoutine);
            }}
          >
            save
          </RoutineMenuItem>
        </RoutineMenu>
      );
    }
    if (!editRoutineId && !isEdit) {
      return (
        <RoutineMenu>
          <RoutineMenuItem
            onClick={() => {
              onRemove();
            }}
            cancelType
          >
            remove
          </RoutineMenuItem>
          <RoutineMenuItem
            onClick={() => {
              onEdit();
            }}
          >
            edit
          </RoutineMenuItem>
        </RoutineMenu>
      );
    }
    return null;
  };
  return (
    <>
      <StyledRoutine color={newRoutine.color}>
        {isEdit ? (
          <RoutineTitleInput
            onChange={(e) => {
              setNewRoutine({ ...newRoutine, title: e.currentTarget.value });
            }}
            ref={inputRef}
            defaultValue={title}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSave(newRoutine);
              }
            }}
          />
        ) : (
          <Text>{newRoutine.title}</Text>
        )}
        {renderMenu()}
      </StyledRoutine>
      {isEdit && (
        <ColorList>
          {Object.keys(colors).map((colorName) => (
            <ColorBlock
              key={colorName}
              color={colors[colorName]}
              onClick={() => {
                focusRef(inputRef);
                setNewRoutine({ ...newRoutine, color: colors[colorName] });
              }}
            />
          ))}
        </ColorList>
      )}
    </>
  );
};
