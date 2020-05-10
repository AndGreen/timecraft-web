import get from 'lodash/get';
import { useDispatch, useSelector } from 'react-redux';

export const useReduxAction = (action) => {
  const dispatch = useDispatch();
  return (...props) => {
    dispatch(action(...props));
  };
};

export const useReduxState = (path) => useSelector((state) => get(state, path));
