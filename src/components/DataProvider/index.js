import { useEffect } from 'react';
import { useReduxAction } from '../../utils/redux';
import { syncDataThunk } from '../../reducers/user';

export const DataProvider = ({ children }) => {
  const syncData = useReduxAction(syncDataThunk);

  useEffect(() => {
    syncData({});
  }, []);

  return children;
};
