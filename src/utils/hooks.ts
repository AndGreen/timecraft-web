import get from 'lodash/get';
import { useDispatch, useSelector } from 'react-redux';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

type Action = ReturnType<typeof createAction>;
type AsyncAction = ReturnType<typeof createAsyncThunk>;

type ReduxAction = Action | AsyncAction;

export function useReduxAction<T extends ReduxAction>(
  action: T,
): (...props: Parameters<T>) => void {
  const dispatch = useDispatch();
  return (...props) => {
    dispatch(action(props));
  };
}

export const useReduxState = (path: string) =>
  useSelector((state) => get(state, path));
