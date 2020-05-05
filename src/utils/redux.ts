import get from 'lodash/get';
import { useDispatch, useSelector } from 'react-redux';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

type Action = ReturnType<typeof createAction>;
export function useReduxAction<T extends Action>(
  action: T,
): (...props: Parameters<T>) => void {
  const dispatch = useDispatch();
  return (...props: Parameters<T>) => {
    const [prop1] = props;
    dispatch(action(prop1));
  };
}

type Thunk = ReturnType<typeof createAsyncThunk>;

// Todo: types
export function useReduxThunk(thunk: any): (...args: any) => void {
  const dispatch = useDispatch();
  return (props) => {
    dispatch(thunk(props));
  };
}

export const useReduxState = (path: string) =>
  useSelector((state) => get(state, path));
