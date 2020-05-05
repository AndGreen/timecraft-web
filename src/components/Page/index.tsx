import React from 'react';
import {
  PageWrapper,
  PageHead,
  PageTitle,
  PageActions,
  PageContent,
  PageMenu,
  PageMenuLeft,
  PageMenuRight,
  PageMenuItem,
} from './styles';
import { useSelector } from 'react-redux';
import { selectSyncDate } from '../../reducers/user';
import dayjs from 'dayjs';

type PageProps = {
  title: React.ReactNode;
  action: React.ReactNode;
  children: React.ReactNode;
};

export const Page = (props: PageProps) => {
  const syncDate = useSelector(selectSyncDate);

  return (
    <PageWrapper>
      <PageMenu>
        <PageMenuLeft>
          <PageMenuItem>
            <b>Days</b>
          </PageMenuItem>
          <PageMenuItem style={{ opacity: 0.3 }}>Actions</PageMenuItem>
        </PageMenuLeft>
        <PageMenuRight>
          <PageMenuItem>
            {syncDate && dayjs(syncDate).format('DD/MM/YY hh:mm')}
          </PageMenuItem>
        </PageMenuRight>
      </PageMenu>
      <PageHead>
        <PageTitle>{props.title}</PageTitle>
        <PageActions>{props.action}</PageActions>
      </PageHead>
      <PageContent>{props.children}</PageContent>
    </PageWrapper>
  );
};
