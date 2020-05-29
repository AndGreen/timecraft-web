import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'react-day-picker/lib/style.css';
import { Styles } from './styles';
import { RootReducer } from './reducers';
import { saveState } from './utils/localstorage';
import { DataProvider } from './components/DataProvider';
import { AuthProvider } from './components/AuthProvider';
import { Day } from './pages';
import { Actions } from './pages/actions';

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

function App() {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <DataProvider>
          <Router>
            <Switch>
              <Route path="/actions">
                <Actions />
              </Route>
              <Route path="/">
                <Day />
              </Route>
            </Switch>
          </Router>
        </DataProvider>
      </AuthProvider>
      <Styles />
    </ReduxProvider>
  );
}

export default App;
