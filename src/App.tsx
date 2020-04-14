import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Styles } from './styles';
import { ColorPicker } from './components/ColorPicker';
import { DayGrid } from './components/DayGrid';
import { Page } from './components/Page';
import { Title } from './components/Title';
import { RootReducer } from './reducers';

const numOnLines = 8;
const numOfBlocksInLine = 9;

let days: string[][] = [];
for (let i = 0; i < numOnLines; i++) {
  days[i] = [];
  for (let j = 0; j < numOfBlocksInLine; j++) {
    days[i][j] = '';
  }
}

const store = configureStore({ reducer: RootReducer });

function App() {
  return (
    <Provider store={store}>
      <Page title={<Title>Smoothy</Title>} action={<ColorPicker />}>
        <DayGrid days={days} />
      </Page>
      <Styles />
    </Provider>
  );
}

export default App;
