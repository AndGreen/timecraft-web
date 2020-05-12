import styled from 'styled-components';
import { theme } from '../../styles';

export const Wrapper = styled.div`
  position: relative;
`;

export const Component = styled.div`
  cursor: pointer;
`;

export const Popup = styled.div`
  margin-top: 100px;
  z-index: 3;
  position: absolute;
  right: 0;
  width: 390px;
  height: 500px;
  background: ${theme.colors.background};
  .firebaseui-card-header {
    padding: 10px 24px 0;
  }
  .firebaseui-container {
    background: ${theme.colors.background};
    box-shadow: none;
  }
  .firebaseui-id-idp-button,
  .firebaseui-idp-text-long {
    font-family: 'Roboto Mono';
    font-size: 13px;
  }
  .firebaseui-title {
    opacity: 0.4;
  }
  .firebaseui-subtitle {
    font-size: 16px;
  }
  .firebaseui-text {
    font-size: 14px;
  }
  .firebaseui-title,
  .firebaseui-label,
  .firebaseui-input,
  .firebaseui-subtitle,
  .firebaseui-text,
  .firebaseui-input-invalid {
    font-family: 'Roboto Mono';
    color: ${theme.colors.font};
  }
  .firebaseui-id-secondary-link {
    font-family: 'Roboto Mono';
    color: ${theme.colors.font} !important;
  }
  .mdl-button--raised.mdl-button--colored,
  .mdl-button.mdl-button--colored {
    font-family: 'Roboto Mono';
    background: ${theme.colors.main};
    box-shadow: none;
    color: black;
  }
  .mdl-button--raised.mdl-button--colored:active,
  .mdl-button--raised.mdl-button--colored:focus:not(:active),
  .mdl-button--raised.mdl-button--colored:hover {
    background: ${theme.colors.main};
    opacity: 0.8;
  }
  .firebaseui-textfield.mdl-textfield .firebaseui-label:after {
    background-color: ${theme.colors.main};
  }
  .firebaseui-textfield.mdl-textfield .firebaseui-input {
    border-color: ${theme.colors.font};
  }
  .mdl-progress.mdl-progress--indeterminate > .bar1,
  .mdl-progress.mdl-progress__indeterminate > .bar1 {
    background-color: ${theme.colors.main};
  }
  .bufferbar,
  .auxbar {
    background-image: none !important;
    background-color: initial !important;
  }
  .mdl-progress.firebaseui-busy-indicator {
    top: 40px;
  }
  @media (max-width: 480px) {
    .firebaseui-card-header {
      border-bottom: none;
      margin-bottom: 16px;
      padding: 16px 24px 0;
    }
  }
`;

export const Title = styled.div`
  text-align: center;
  padding: 20px 0;
  margin-bottom: 20px;
  background: ${theme.colors.subBackground};
`;
