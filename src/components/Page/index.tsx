import React from 'react';
import {
  PageWrapper,
  PageHead,
  PageTitle,
  PageActions,
  PageContent,
} from './styles';

type PageProps = {
  title: React.ReactNode;
  action: React.ReactNode;
  children: React.ReactNode;
};

export const Page = (props: PageProps) => (
  <PageWrapper>
    <PageHead>
      <PageTitle>{props.title}</PageTitle>
      <PageActions>{props.action}</PageActions>
    </PageHead>
    <PageContent>{props.children}</PageContent>
  </PageWrapper>
);
