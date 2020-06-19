import { combineReducers } from 'redux';
import { blocks } from './blocks';
import { colors } from './colors';
import { picker } from './picker';
import { days } from './days';
import { user } from './user';
import { routines } from './routines';
import { budgets } from './budgets';

export const RootReducer = combineReducers({
  user,
  budgets,
  blocks,
  colors,
  routines,
  picker,
  days,
});
