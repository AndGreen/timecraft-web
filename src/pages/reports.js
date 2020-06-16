import React from 'react';
import { Title } from '../components/Title';
import { Page } from '../components/Page';
import { LastWeekReport } from '../components/LastWeekReport';

export const Reports = () => {
  return (
    <Page title={<Title>Timecraft</Title>}>
      <LastWeekReport />
    </Page>
  );
};
