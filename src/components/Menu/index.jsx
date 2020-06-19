import React from 'react';
import { firebase } from '../../api/firebase';
import { LoginPicker } from '../LoginPicker';
import { useSelector } from 'react-redux';
import { selectProfile, setProfileReduce } from '../../reducers/user';
import { useReduxAction } from '../../utils/redux';
import {
  StyledMenu,
  MenuLeft,
  MenuRight,
  Item,
  Logout,
  AuthItem,
} from './styles';

export const Menu = () => {
  const setUserProfile = useReduxAction(setProfileReduce);
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
        <Item to="/routines">Routines</Item>
        <Item exact to="/">
          Days
        </Item>
        <Item to="/budgets">Budgets</Item>
        <Item to="/reports">Reports</Item>
      </MenuLeft>
      <MenuRight>
        <AuthItem>
          {!profile && <LoginPicker />}
          {profile && (
            <span>
              {getInitials(profile.name)}{' '}
              <Logout
                onClick={() => {
                  setUserProfile(null);
                  firebase.auth().signOut();
                }}
              >
                (logout)
              </Logout>
            </span>
          )}
        </AuthItem>
      </MenuRight>
    </StyledMenu>
  );
};
