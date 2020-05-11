import { useEffect } from 'react';
import { useReduxAction } from '../../utils/redux';
import { selectProfile, syncDataThunk } from '../../reducers/user';
import { useSelector } from 'react-redux';

export const DataProvider = ({ children }) => {
  const profile = useSelector(selectProfile);
  const syncData = useReduxAction(syncDataThunk);

  useEffect(() => {
    if (profile) syncData();
  }, [profile]);

  return children;
};
