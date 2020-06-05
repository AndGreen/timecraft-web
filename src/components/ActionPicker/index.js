import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { find } from 'lodash';
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
import { Wrapper, Component, Popup, StyledActionsList } from './styles';
import { NewActionButton, StyledAction } from '../ActionsList/styles';
import { isEmpty } from 'lodash';
import { usePickerCloseOutsideClick } from '../../utils/hooks';

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
  usePickerCloseOutsideClick(pickerRef, pickerName);

  return (
    <Wrapper ref={pickerRef}>
      <Component
        opened={isOpened}
        color={activeAction.color}
        onClick={() => {
          togglePickerStatus(pickerName);
        }}
      >
        {activeAction.title || 'Choose action'}
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
