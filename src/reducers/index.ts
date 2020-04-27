import { combineReducers } from 'redux';
import { blocks } from './blocks';
import { colors } from './colors';
import { picker } from './picker';
import { days } from './days';

export const RootReducer = combineReducers({ blocks, colors, picker, days });

export type RootState = ReturnType<typeof RootReducer>;
