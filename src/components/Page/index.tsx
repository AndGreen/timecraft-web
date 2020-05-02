import React, { useEffect } from 'react';
import {
  PageWrapper,
  PageHead,
  PageTitle,
  PageActions,
  PageContent,
} from './styles';
import { useFirestore } from 'reactfire';
import { useSelector } from 'react-redux';
import { selectActiveDay } from '../../reducers/days';

type PageProps = {
  title: React.ReactNode;
  action: React.ReactNode;
  children: React.ReactNode;
};

export const Page = (props: PageProps) => {
  const db = useFirestore();
  const activeDay = useSelector(selectActiveDay);
  useEffect(() => {
    console.log(activeDay);
    db.collection('days').doc('1/20/2020').set({});
  }, [activeDay]);

  return (
    <PageWrapper>
      <PageHead>
        <PageTitle>{props.title}</PageTitle>
        <PageActions>{props.action}</PageActions>
      </PageHead>
      <PageContent>{props.children}</PageContent>
    </PageWrapper>
  );
};
