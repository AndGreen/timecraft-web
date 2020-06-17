import React from 'react';
import { Title } from '../components/Title';
import { Page } from '../components/Page';
import { BudgetList } from '../components/BudgetList';

export const Budgets = () => {
  return (
    <Page title={<Title>Timecraft</Title>}>
      <BudgetList />
    </Page>
  );
};
