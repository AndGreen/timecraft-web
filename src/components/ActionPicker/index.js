import React from 'react';
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
  selectActiveActionId,
  setActiveActionReduce,
} from '../../reducers/actions';
import { Wrapper, Component, Popup, StyledActionsList } from './styles';
import { Action } from '../ActionsList/Action';
import { NewActionButton, StyledAction } from '../ActionsList/styles';
import { isEmpty } from 'lodash';
import { colors } from '../../types/colors';

const getColorListByActions = (actions) => {
  const colors = {};
  actions.forEach((action) => {
    colors[action.id] = actions.color;
  });
  return colors;
};

export const ActionPicker = () => {
  const pickerName = 'actions';
  const openedPicker = useSelector(selectOpenedPickerName);
  const togglePickerStatus = useReduxAction(togglePickerNameAction);
  const isOpened = openedPicker === pickerName;

  const history = useHistory();

  const actions = useSelector(selectActions);
  const colors = getColorListByActions(actions);
  const activeActionId = useSelector(selectActiveActionId);
  const setActiveAction = useReduxAction(setActiveActionReduce);
  const activeAction = activeActionId
    ? find(actions, 'id', activeActionId)
    : {};

  return (
    <Wrapper>
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
                    setActiveAction(item.id);
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
