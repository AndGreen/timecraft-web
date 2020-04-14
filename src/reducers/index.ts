import { combineReducers } from 'redux';
import { blocks } from './blocks';
import { colors } from './colors';

export const RootReducer = combineReducers({ blocks, colors });
