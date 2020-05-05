import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import 'react-day-picker/lib/style.css';
import { Styles } from './styles';
import { ColorPicker } from './components/ColorPicker';
import { DayGrid } from './components/DayGrid';
import { Page } from './components/Page';
import { Title } from './components/Title';
import { RootReducer } from './reducers';
import { saveState } from './utils/localstorage';
import { DatePicker } from './components/DatePicker';
import { DataSync } from './components/DataSync';

const numOnLines = 8;
const numOfBlocksInLine = 9;

let days: string[][] = [];
for (let i = 0; i < numOnLines; i++) {
  days[i] = [];
  for (let j = 0; j < numOfBlocksInLine; j++) {
    days[i][j] = '';
  }
}

const store = configureStore({
  reducer: RootReducer,
});

store.subscribe(() => {
  const {
    days: { archive },
    user: { sync_date },
  } = store.getState();
  saveState('days', archive);
  saveState('sync_date', sync_date);
});

const ActionBar = styled.div`
  display: flex;
`;

const LeftAction = styled.div`
  margin-right: 12px;
`;
const RightAction = styled.div``;

function App() {
  return (
    <Provider store={store}>
      <DataSync>
        <Page
          title={<Title>Smoothy</Title>}
          action={
            <ActionBar>
              <LeftAction>
                <ColorPicker />
              </LeftAction>
              <RightAction>
                <DatePicker />
              </RightAction>
            </ActionBar>
          }
        >
          <DayGrid days={days} />
        </Page>
      </DataSync>
      <Styles />
    </Provider>
  );
}

export default App;
