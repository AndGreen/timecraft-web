import React from 'react';
import styled, { css } from 'styled-components';
import { Styles, theme } from './styles';

const Page = styled.div`
  width: 390px;
  margin: 0 auto;
`;

const PageHead = styled.div`
  padding-top: 73px;
`;
const PageTitle = styled.div`
  padding-bottom: 27px;
`;
const PageActions = styled.div`
  padding-bottom: 24px;
`;
const PageContent = styled.div``;

const Logo = styled.div`
  font-size: ${theme.sizes.title};
  color: ${theme.colors.main};
  font-weight: bold;
`;

type ColorPickerProps = {
  active?: boolean;
};

const arrowCss = css`
  border-color: ${theme.colors.font} transparent;
  border-style: solid;
  height: 0px;
  width: 0px;
`;

const arrowDownCss = css`
  ${arrowCss};
  border-width: 5px 5px 0px 5px;
`;

const arrowUpCss = css`
  ${arrowCss};
  border-width: 0px 5px 5px 5px;
`;

const ColorPicker = styled.div<ColorPickerProps>`
  position: relative;
  border: 1px solid ${theme.colors.borders};
  display: flex;
  height: 36px;
  align-items: center;
  padding-left: 36px;
  color: ${theme.colors.font};
  font-weight: bold;
  cursor: pointer;

  &:before {
    display: block;
    position: absolute;
    content: '';
    width: 12px;
    height: 12px;
    left: 12px;
    top: 12px;
    background-color: ${theme.colors.font};
  }

  &:after {
    display: block;
    content: '';
    position: absolute;
    right: 12px;
    ${(p) => (p.active ? arrowUpCss : arrowDownCss)}
  }
`;

const DayGrid = styled.div`
  display: table;
  border-collapse: collapse;
  margin-left: 12px;
`;
const Line = styled.div`
  display: table-row;
`;
const Label = styled.div`
  display: table-cell;
  padding-right: 12px;
  font-size: ${theme.sizes.small};
  color: ${theme.colors.main};
  vertical-align: middle;
`;
const DayBlock = styled.div`
  width: 35px;
  height: 35px;
  display: table-cell;
  border: 1px solid ${theme.colors.borders};
  &:nth-child(4),
  &:nth-child(7) {
    border-right-width: 3px;
  }
`;

const numOnLines = 8;
const numOfBlocksInLine = 9;
const linesLabels = [
  '00:00',
  '03:00',
  '06:00',
  '09:00',
  '12:00',
  '15:00',
  '18:00',
  '21:00',
];

let days: string[][] = [];
for (let i = 0; i < numOnLines; i++) {
  days[i] = [];
  for (let j = 0; j < numOfBlocksInLine; j++) {
    days[i][j] = '';
  }
}

function App() {
  return (
    <>
      <Page>
        <PageHead>
          <PageTitle>
            <Logo>Smoothy</Logo>
          </PageTitle>
          <PageActions>
            <ColorPicker>Color</ColorPicker>
          </PageActions>
        </PageHead>
        <PageContent>
          <DayGrid>
            {days.map((line, lineNum) => (
              <Line key={`day-line-${lineNum}`}>
                <Label>{linesLabels[lineNum]}</Label>
                {line.map((day, i) => (
                  <DayBlock key={`day-block-${lineNum}-${i}`} />
                ))}
              </Line>
            ))}
          </DayGrid>
        </PageContent>
      </Page>
      <Styles />
    </>
  );
}

export default App;
