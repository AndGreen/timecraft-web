import styled from 'styled-components';
import { theme } from '../../styles';

export const StyledMenu = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const MenuLeft = styled.div``;
export const MenuRight = styled.div`
  padding-right: 6px;
  font-size: 13px;
`;
export const Item = styled.div`
  display: inline;
  color: ${theme.colors.font};
  &:not(:last-of-type) {
    margin-right: 18px;
  }
`;

export const Logout = styled.a`
  opacity: 0.5;
`;
