import React from 'react';
import {
  PageWrapper,
  PageHead,
  PageTitle,
  PageActions,
  PageContent,
} from './styles';
import { Menu } from '../Menu';

export const Page = (props) => {
  return (
    <PageWrapper>
      <Menu />
      <PageHead>
        <PageTitle>{props.title}</PageTitle>
        {props.action && <PageActions>{props.action}</PageActions>}
      </PageHead>
      <PageContent>{props.children}</PageContent>
    </PageWrapper>
  );
};
