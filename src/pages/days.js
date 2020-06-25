import React from 'react';
import styled from 'styled-components';
import { DatePicker } from '../components/DatePicker';
import { DayGrid } from '../components/DayGrid';
import { Page } from '../components/Page';
import { RoutinePicker } from '../components/RoutinePicker';
import { DailyBudget } from '../components/DailyBudget';

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
    action={
      <ActionBar>
        <LeftAction>
          <RoutinePicker />
        </LeftAction>
        <RightAction>
          <DatePicker />
        </RightAction>
      </ActionBar>
    }
  >
    <DayGrid days={days} />
    <DailyBudget />
  </Page>
);
