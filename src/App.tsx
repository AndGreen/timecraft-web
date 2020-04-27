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
import { loadState, saveState } from './utils/localstorage';
import { DatePicker } from './components/DatePicker';

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
  preloadedState: loadState(),
});

store.subscribe(() => {
  const { archive } = store.getState().days;
  saveState({ days: { archive } });
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
      <Styles />
    </Provider>
  );
}

export default App;
