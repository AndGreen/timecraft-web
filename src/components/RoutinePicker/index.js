import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useReduxAction } from '../../utils/redux';
import {
  togglePickerNameReduce,
  selectOpenedPickerName,
} from '../../reducers/picker';
import {
  selectRoutines,
  selectActiveRoutine,
  setActiveRoutineReduce,
} from '../../reducers/routines';
import {
  Wrapper,
  Component,
  Popup,
  StyledRoutinesList,
  CancelBtn,
  Text,
} from './styles';
import { NewRoutineButton, StyledRoutine } from '../RoutinesList/styles';
import { isEmpty } from 'lodash';
import {
  useCreateNewRoutine,
  usePickerCloseOutsideClick,
} from '../../utils/hooks';

const emptyRoutine = {
  id: 'removed',
  color: null,
  title: 'Empty routine',
};

export const RoutinePicker = () => {
  const pickerName = 'routines';
  const openedPicker = useSelector(selectOpenedPickerName);
  const togglePickerStatus = useReduxAction(togglePickerNameReduce);
  const isOpened = openedPicker === pickerName;

  const history = useHistory();

  const routines = useSelector(selectRoutines);
  const activeRoutine = useSelector(selectActiveRoutine);
  const setActiveRoutine = useReduxAction(setActiveRoutineReduce);
  const createNewRoutine = useCreateNewRoutine();

  const pickerRef = useRef(null);
  const closeBtnRef = useRef(null);
  usePickerCloseOutsideClick(pickerRef, pickerName);

  return (
    <Wrapper ref={pickerRef}>
      <Component
        opened={isOpened}
        color={activeRoutine.color}
        onClick={(e) => {
          if (!closeBtnRef.current || !closeBtnRef.current.contains(e.target)) {
            togglePickerStatus(pickerName);
          }
        }}
      >
        <Text>{activeRoutine.title || emptyRoutine.title}</Text>
        {!isEmpty(activeRoutine) && activeRoutine.id !== emptyRoutine.id && (
          <CancelBtn
            ref={closeBtnRef}
            onClick={() => {
              setActiveRoutine(emptyRoutine);
              if (openedPicker) togglePickerStatus(pickerName);
            }}
          />
        )}
      </Component>
      {isOpened && (
        <Popup>
          {isEmpty(routines) ? (
            <NewRoutineButton
              border
              onClick={() => {
                createNewRoutine();
                history.push('/routines');
                togglePickerStatus(pickerName);
              }}
            >
              + new routines
            </NewRoutineButton>
          ) : (
            <StyledRoutinesList>
              {routines.map((item) => (
                <StyledRoutine
                  key={item.id}
                  onClick={() => {
                    setActiveRoutine(item);
                    togglePickerStatus(pickerName);
                  }}
                  color={item.color}
                >
                  {item.title}
                </StyledRoutine>
              ))}
            </StyledRoutinesList>
          )}
        </Popup>
      )}
    </Wrapper>
  );
};
