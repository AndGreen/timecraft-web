import React from 'react';
import { Title } from '../components/Title';
import { Page } from '../components/Page';
import { ActionsList } from '../components/ActionsList';

export const Actions = () => {
  return (
    <Page title={<Title>Timecraft</Title>}>
      <ActionsList />
    </Page>
  );
};
