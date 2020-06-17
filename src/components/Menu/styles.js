import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
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

const itemCss = css`
  display: inline;
  color: ${theme.colors.font};
  margin-right: 18px;
`;

export const StyledItem = styled.div`
  ${itemCss};
  opacity: 0.3;
`;

export const StyledLink = styled(NavLink)`
  ${itemCss};
`;

export const AuthItem = styled.div`
  color: ${theme.colors.font};
`;

export const Item = (props) =>
  props.disabled ? (
    <StyledItem {...props} />
  ) : (
    <StyledLink
      activeStyle={{ fontWeight: 'bold', color: theme.colors.main }}
      {...props}
    />
  );

export const Logout = styled.a`
  opacity: 0.5;
  cursor: pointer;
`;
