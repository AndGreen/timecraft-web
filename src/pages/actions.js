import React, { useState, useEffect, useRef } from 'react';
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
  cursor: pointer;

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
  color: ${theme.colors.main};
`;
const ActionTitleInput = styled.input`
  background: none;
  padding: 0;
  border: none;
  color: ${theme.colors.font};
  width: 100%;
  margin-right: 15px;
`;

const Action = ({ id, editActionId, color, title }) => {
  const isEdit = id === editActionId;
  return (
    <>
      <StyledAction color={color}>
        {isEdit ? <ActionTitleInput value={title} /> : title}
        {isEdit ? (
          <ActionMenu>
            <ActionMenuItem>cancel</ActionMenuItem>
            <ActionMenuItem>save</ActionMenuItem>
          </ActionMenu>
        ) : (
          <ActionMenu>
            <ActionMenuItem>remove</ActionMenuItem>
            <ActionMenuItem>edit</ActionMenuItem>
          </ActionMenu>
        )}
      </StyledAction>
      {isEdit && (
        <ColorList>
          {Object.keys(colors).map((colorName) => (
            <ColorBlock key={colorName} color={colors[colorName]} />
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
            />
          ))}
        </ActionsList>
      )}
      {!editActionId && (
        <NewActionButton border={isEmpty(actions)}>
          + new actions
        </NewActionButton>
      )}
    </Page>
  );
};
