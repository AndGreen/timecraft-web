import React from 'react';
import {
  PageWrapper,
  PageHead,
  PageTitle,
  PageActions,
  PageContent,
} from './styles';
import { Menu } from '../Menu';
import { useSelector } from 'react-redux';
import { selectIsPickerOpened } from '../../reducers/picker';

export const Page = (props) => {
  const isPickerOpened = useSelector(selectIsPickerOpened);
  return (
    <PageWrapper>
      <Menu />
      <PageHead>
        <PageTitle>{props.title}</PageTitle>
        {props.action && <PageActions>{props.action}</PageActions>}
      </PageHead>
      <PageContent opacity={isPickerOpened}>{props.children}</PageContent>
    </PageWrapper>
  );
};
