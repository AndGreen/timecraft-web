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
import { Day } from './pages/days';
import { Routines } from './pages/routines';
import { Reports } from './pages/reports';
import { Budgets } from './pages/budgets';

const store = configureStore({
  reducer: RootReducer,
});

store.subscribe(() => {
  const {
    days: { archive },
    user: { lastEditDate },
    routines: { list },
    budgets: { daily },
  } = store.getState();
  saveState('routines', list);
  saveState('days', archive);
  saveState('lastEditDate', lastEditDate);
  saveState('budget', daily);
});

function App() {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <DataProvider>
          <Router>
            <Switch>
              <Route path="/routines" component={Routines} />
              <Route path="/reports" component={Reports} />
              <Route path="/budgets" component={Budgets} />
              <Route path="/" component={Day} />
            </Switch>
          </Router>
        </DataProvider>
      </AuthProvider>
      <Styles />
    </ReduxProvider>
  );
}

export default App;
