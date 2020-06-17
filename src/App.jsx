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
import { Actions } from './pages/actions';
import { Reports } from './pages/reports';
import { Budgets } from './pages/budgets';

const store = configureStore({
  reducer: RootReducer,
});

store.subscribe(() => {
  const {
    days: { archive },
    user: { lastEditDate },
    actions: { list },
  } = store.getState();
  saveState('actions', list);
  saveState('days', archive);
  saveState('lastEditDate', lastEditDate);
});

function App() {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <DataProvider>
          <Router>
            <Switch>
              <Route path="/actions" component={Actions} />
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
