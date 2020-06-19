import React from 'react';
import { Title } from '../components/Title';
import { Page } from '../components/Page';
import { RoutinesList } from '../components/RoutinesList';

export const Routines = () => {
  return (
    <Page title={<Title>Timecraft</Title>}>
      <RoutinesList />
    </Page>
  );
};
