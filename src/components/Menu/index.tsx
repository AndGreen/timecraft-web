import React from 'react';
import { StyledMenu, MenuLeft, MenuRight, Item, Logout } from './styles';
import { useAuth0 } from '../AuthProvider';
import { Loader } from '../Loader';

export const Menu = () => {
  const getInitials = (name: string) => {
    const words = name.split(' ');
    return words[0][0] + words[1][0];
  };
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    loading,
    user,
  } = useAuth0();
  return (
    <StyledMenu>
      <MenuLeft>
        <Item>
          <b>Days</b>
        </Item>
        <Item style={{ opacity: 0.3 }}>Actions</Item>
      </MenuLeft>
      <MenuRight>
        {loading ? (
          <Item>
            <Loader />
          </Item>
        ) : (
          <Item>
            {!isAuthenticated && (
              <a onClick={() => loginWithRedirect({})}>Login</a>
            )}

            {isAuthenticated && (
              <span>
                {getInitials(user.name)}{' '}
                <Logout
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  (logout)
                </Logout>
              </span>
            )}
          </Item>
        )}
      </MenuRight>
    </StyledMenu>
  );
};
