import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';
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
import { DataProvider } from './components/DataProvider';
import { AuthProvider } from './components/AuthProvider';

const numOnLines = 8;
const numOfBlocksInLine = 9;

let days = [];
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
    user: { syncDate },
  } = store.getState();
  saveState('days', archive);
  saveState('syncDate', syncDate);
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
    <ReduxProvider store={store}>
      <AuthProvider>
        <DataProvider>
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
        </DataProvider>
      </AuthProvider>
      <Styles />
    </ReduxProvider>
  );
}

export default App;
