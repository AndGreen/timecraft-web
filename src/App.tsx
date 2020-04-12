import React from 'react';
import { Styles } from './styles';
import { ColorPicker } from './components/ColorPicker';
import { DayGrid } from './components/DayGrid';
import { Page } from './components/Page';
import { Title } from './components/Title';

const numOnLines = 8;
const numOfBlocksInLine = 9;

let days: string[][] = [];
for (let i = 0; i < numOnLines; i++) {
  days[i] = [];
  for (let j = 0; j < numOfBlocksInLine; j++) {
    days[i][j] = '';
  }
}

function App() {
  return (
    <>
      <Page title={<Title>Smoothy</Title>} action={<ColorPicker />}>
        <DayGrid days={days} />
      </Page>
      <Styles />
    </>
  );
}

export default App;
