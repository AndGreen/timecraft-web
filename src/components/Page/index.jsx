import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsPickerOpened } from '../../reducers/picker';
import { Menu } from '../Menu';
import { Title } from '../Title';
import {
  PageWrapper,
  PageHead,
  PageTitle,
  PageActions,
  PageContent,
} from './styles';

export const Page = (props) => {
  const isPickerOpened = useSelector(selectIsPickerOpened);
  return (
    <PageWrapper>
      <Menu />
      <PageHead>
        <PageTitle>{props.title || <Title>Smoothy</Title>}</PageTitle>
        {props.action && <PageActions>{props.action}</PageActions>}
      </PageHead>
      <PageContent opacity={isPickerOpened}>{props.children}</PageContent>
    </PageWrapper>
  );
};
