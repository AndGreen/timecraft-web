import React from 'react';
import { BouncingLoader } from './styles';

export const Loader = ({ color }) => (
  <BouncingLoader color={color}>
    <div />
    <div />
    <div />
  </BouncingLoader>
);
