import React from 'react';
import styled from 'styled-components';
import { Styles, theme } from './styles';

const Page = styled.div`
  width: 390px;
  margin: 0 auto;
`;
const Logo = styled.div`
  font-size: ${theme.sizes.title};
  color: ${theme.colors.main};
  font-weight: bold;
  margin-top: 73px;
`;

function App() {
  return (
    <>
      <Page>
        <Logo>Smoothy</Logo>
      </Page>
      <Styles />
    </>
  );
}

export default App;
