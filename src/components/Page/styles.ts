import styled from 'styled-components';
import { theme } from '../../styles';

export const PageWrapper = styled.div`
  width: 390px;
  margin: 0 auto;
`;

export const PageMenu = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const PageMenuLeft = styled.div``;
export const PageMenuRight = styled.div`
  padding-right: 6px;
  font-size: 13px;
`;
export const PageMenuItem = styled.a`
  color: ${theme.colors.font};
  &:not(:last-of-type) {
    margin-right: 18px;
  }
`;

export const PageHead = styled.div`
  padding-top: 34px;
`;

export const PageTitle = styled.div`
  padding-bottom: 27px;
`;

export const PageActions = styled.div`
  padding-bottom: 24px;
`;

export const PageContent = styled.div``;
