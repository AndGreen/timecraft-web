import React from 'react';
import {
  PageWrapper,
  PageHead,
  PageTitle,
  PageActions,
  PageContent,
} from './styles';
import { Menu } from '../Menu';

type PageProps = {
  title: React.ReactNode;
  action: React.ReactNode;
  children: React.ReactNode;
};

export const Page = (props: PageProps) => {
  return (
    <PageWrapper>
      <Menu />
      <PageHead>
        <PageTitle>{props.title}</PageTitle>
        <PageActions>{props.action}</PageActions>
      </PageHead>
      <PageContent>{props.children}</PageContent>
    </PageWrapper>
  );
};
