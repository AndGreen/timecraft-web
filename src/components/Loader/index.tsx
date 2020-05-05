import React from 'react';
import { BouncingLoader } from './styles';

type LoaderProps = {
  color?: string;
};

export const Loader = ({ color }: LoaderProps) => (
  <BouncingLoader color={color}>
    <div />
    <div />
    <div />
  </BouncingLoader>
);
