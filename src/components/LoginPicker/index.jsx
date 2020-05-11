import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useReduxAction } from '../../utils/redux';
import { Wrapper, Component, Popup, Title } from './styles';
import {
  selectOpenedPickerName,
  togglePickerNameAction,
} from '../../reducers/picker';
import { firebase } from '../../api/firebase';
import { setProfileAction } from '../../reducers/user';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getMobileOperatingSystem } from '../../utils/window';

const firebaseui = require('firebaseui');

export const LoginPicker = () => {
  const setUserProfile = useReduxAction(setProfileAction);
  const pickerName = 'login';
  const openedPicker = useSelector(selectOpenedPickerName);
  const togglePickerStatus = useReduxAction(togglePickerNameAction);
  const isOpened = openedPicker === pickerName;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user, a, b) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        setUserProfile({
          id: uid,
          name: displayName,
          email,
          photo: photoURL,
        });
      }
    });
  }, []);

  let signInFlow = 'popup';
  // For iOS full screen apps we use the redirect auth mode.
  if (getMobileOperatingSystem()) {
    signInFlow = 'redirect';
  }

  const uiConfig = {
    signInFlow: signInFlow,
    signInSuccessUrl: '/signin',
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };

  return (
    <Wrapper>
      <Component
        opened={isOpened}
        onClick={() => {
          togglePickerStatus(pickerName);
        }}
      >
        {isOpened ? '(x)' : 'login'}
      </Component>
      {isOpened && (
        <Popup>
          <Title>Sign up / Sign in</Title>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </Popup>
      )}
    </Wrapper>
  );
};
