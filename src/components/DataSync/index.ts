import { useEffect } from 'react';
import { useReduxThunk } from '../../utils/redux';
import { syncDataThunk } from '../../reducers/user';

type Props = {
  children: React.ReactElement;
};

export const DataSync = ({ children }: Props) => {
  const syncData = useReduxThunk(syncDataThunk);

  useEffect(() => {
    syncData({});
  }, []);

  return children;
};
