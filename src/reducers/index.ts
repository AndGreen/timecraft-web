import { combineReducers } from 'redux';
import { blocks } from './blocks';
import { colors } from './colors';
import { picker } from './picker';

export const RootReducer = combineReducers({ blocks, colors, picker });

export type RootState = ReturnType<typeof RootReducer>;
