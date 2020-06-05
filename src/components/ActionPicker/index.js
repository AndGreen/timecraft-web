import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useReduxAction } from '../../utils/redux';
import {
  togglePickerNameAction,
  selectOpenedPickerName,
} from '../../reducers/picker';
import {
  selectActions,
  selectActiveAction,
  setActiveActionReduce,
} from '../../reducers/actions';
import {
  Wrapper,
  Component,
  Popup,
  StyledActionsList,
  CancelBtn,
  Text
} from './styles';
import { NewActionButton, StyledAction } from '../ActionsList/styles';
import { isEmpty } from 'lodash';
import { usePickerCloseOutsideClick } from '../../utils/hooks';

const emptyAction = {
  id: 'removed',
  color: null,
  title: 'Empty action',
};

export const ActionPicker = () => {
  const pickerName = 'actions';
  const openedPicker = useSelector(selectOpenedPickerName);
  const togglePickerStatus = useReduxAction(togglePickerNameAction);
  const isOpened = openedPicker === pickerName;

  const history = useHistory();

  const actions = useSelector(selectActions);
  const activeAction = useSelector(selectActiveAction);
  const setActiveAction = useReduxAction(setActiveActionReduce);

  const pickerRef = useRef(null);
  const closeBtnRef = useRef(null);
  usePickerCloseOutsideClick(pickerRef, pickerName);

  return (
    <Wrapper ref={pickerRef}>
      <Component
        opened={isOpened}
        color={activeAction.color}
        onClick={(e) => {
          if (!closeBtnRef.current || !closeBtnRef.current.contains(e.target)) {
            togglePickerStatus(pickerName);
          }
        }}
      >
        <Text>{activeAction.title || emptyAction.title}</Text>
        {!isEmpty(activeAction) && activeAction.id !== emptyAction.id && (
          <CancelBtn
            ref={closeBtnRef}
            onClick={() => {
              setActiveAction(emptyAction);
              if (openedPicker) togglePickerStatus(pickerName);
            }}
          />
        )}
      </Component>
      {isOpened && (
        <Popup>
          {isEmpty(actions) ? (
            <NewActionButton
              border
              onClick={() => {
                history.push('/actions');
              }}
            >
              + new actions
            </NewActionButton>
          ) : (
            <StyledActionsList>
              {actions.map((item) => (
                <StyledAction
                  key={item.id}
                  onClick={() => {
                    setActiveAction(item);
                    togglePickerStatus(pickerName);
                  }}
                  color={item.color}
                >
                  {item.title}
                </StyledAction>
              ))}
            </StyledActionsList>
          )}
        </Popup>
      )}
    </Wrapper>
  );
};
