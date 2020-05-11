import React, { useState } from 'react';
import { StyledMenu, MenuLeft, MenuRight, Item, Logout } from './styles';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuth0 } from '../AuthProvider';
import { Loader } from '../Loader';
import { firebase } from '../../api/firebase';
import { LoginPicker } from '../LoginPicker';
import { useSelector } from 'react-redux';
import { selectProfile } from '../../reducers/user';

export const Menu = () => {
  const profile = useSelector(selectProfile);
  const getInitials = (name) => {
    if (typeof name === 'string') {
      if (name.includes(' ')) {
        const words = name.split(' ');
        return words[0][0] + words[1][0];
      } else return name;
    } else {
      return 'unnamed';
    }
  };
  return (
    <StyledMenu>
      <MenuLeft>
        <Item>
          <b>Days</b>
        </Item>
        <Item style={{ opacity: 0.3 }}>Actions</Item>
      </MenuLeft>
      <MenuRight>
        <Item>
          {!profile && <LoginPicker />}
          {profile && (
            <span>
              {getInitials(profile.name)}{' '}
              <Logout onClick={() => firebase.auth().signOut()}>
                (logout)
              </Logout>
            </span>
          )}
        </Item>
      </MenuRight>
    </StyledMenu>
  );
};
