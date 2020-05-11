import styled from 'styled-components';
import { theme } from '../../styles';
import { arrowDownCss, arrowUpCss } from '../Icons/arrow';

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
`;

export const Title = styled.div`
  text-align: center;
  padding: 20px 0;
  margin-bottom: 20px;
  background: ${theme.colors.subBackground};
`;
