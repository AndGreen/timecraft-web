import React, { useEffect } from 'react';
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
import {
  FirebaseAppProvider,
  useFirestoreDocData,
  useFirestore,
  SuspenseWithPerf,
} from 'reactfire';

const numOnLines = 8;
const numOfBlocksInLine = 9;

let days: string[][] = [];
for (let i = 0; i < numOnLines; i++) {
  days[i] = [];
  for (let j = 0; j < numOfBlocksInLine; j++) {
    days[i][j] = '';
  }
}

const firebaseConfig = {
  apiKey: 'AIzaSyBMCEcHyeG9TPiwwiwjqab-feNG27_CJZs',
  authDomain: 'smoothy-b4774.firebaseapp.com',
  databaseURL: 'https://smoothy-b4774.firebaseio.com',
  projectId: 'smoothy-b4774',
  storageBucket: 'smoothy-b4774.appspot.com',
  messagingSenderId: '909155581443',
  appId: '1:909155581443:web:e6c6c37f392ac020d8d836',
  measurementId: 'G-Q6J77CJYNM',
};

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
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider store={store}>
        <SuspenseWithPerf
          fallback={<p>loading app...</p>}
          traceId={'load-days-status'}
        >
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
        </SuspenseWithPerf>
        <Styles />
      </Provider>
    </FirebaseAppProvider>
  );
}

export default App;
