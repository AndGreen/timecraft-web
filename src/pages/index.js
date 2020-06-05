import React from 'react';
import styled from 'styled-components';
import { Title } from '../components/Title';
import { DatePicker } from '../components/DatePicker';
import { DayGrid } from '../components/DayGrid';
import { Page } from '../components/Page';
import { ActionPicker } from '../components/ActionPicker';

const numOnLines = 8;
const numOfBlocksInLine = 9;

let days = [];
for (let i = 0; i < numOnLines; i++) {
  days[i] = [];
  for (let j = 0; j < numOfBlocksInLine; j++) {
    days[i][j] = '';
  }
}

const ActionBar = styled.div`
  display: flex;
`;

const LeftAction = styled.div`
  margin-right: 12px;
`;
const RightAction = styled.div``;

export const Day = () => (
  <Page
    title={<Title>Timecraft</Title>}
    action={
      <ActionBar>
        <LeftAction>
          <ActionPicker />
        </LeftAction>
        <RightAction>
          <DatePicker />
        </RightAction>
      </ActionBar>
    }
  >
    <DayGrid days={days} />
  </Page>
);
