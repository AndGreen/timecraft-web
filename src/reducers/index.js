import { combineReducers } from 'redux';
import { blocks } from './blocks';
import { colors } from './colors';
import { picker } from './picker';
import { days } from './days';
import { user } from './user';
import { actions } from './actions';

export const RootReducer = combineReducers({
  user,
  blocks,
  colors,
  actions,
  picker,
  days,
});
