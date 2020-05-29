import React from 'react';
import { StyledMenu, MenuLeft, MenuRight, Item, Logout } from './styles';
import { firebase } from '../../api/firebase';
import { LoginPicker } from '../LoginPicker';
import { useSelector } from 'react-redux';
import { selectProfile, setProfileAction } from '../../reducers/user';
import { useReduxAction } from '../../utils/redux';

export const Menu = () => {
  const setUserProfile = useReduxAction(setProfileAction);
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
        <Item to="/">
          <b>Days</b>
        </Item>
        <Item to="/actions" >
          Actions
        </Item>
        <Item disabled style={{ opacity: 0.3 }}>Reports</Item>
      </MenuLeft>
      <MenuRight>
        <Item>
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
        </Item>
      </MenuRight>
    </StyledMenu>
  );
};
