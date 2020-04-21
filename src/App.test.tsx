import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('render app', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Smoothy/i);
  expect(linkElement).toBeInTheDocument();
});
