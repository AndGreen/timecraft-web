import { css } from 'styled-components';
import { theme } from '../../styles';

export const arrowCss = css`
  border-color: ${theme.colors.font} transparent;
  border-style: solid;
  height: 0px;
  width: 0px;
`;

export const arrowDownCss = css`
  ${arrowCss};
  border-width: 4px 4px 0px 4px;
`;

export const arrowUpCss = css`
  ${arrowCss};
  border-width: 0px 4px 4px 4px;
`;
