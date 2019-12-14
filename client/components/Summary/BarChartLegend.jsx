/* eslint-disable import/extensions */
import React from 'react';
import Dot from './Dot.jsx';
import { HalfContainer, Label } from '../styles.jsx';
import { formatNum } from '../../utils';

const BarChartLegend = (props) => {
  const {
    legendColor,
    legendKey,
    legendVal,
  } = props;
  return (
    <>
      <HalfContainer>
        <Dot color={legendColor} />
        <Label color="#767676">
          {legendKey}
        </Label>
      </HalfContainer>
      <HalfContainer align="right">
        <Label>
          {formatNum(legendVal)}
        </Label>
      </HalfContainer>
    </>
  );
};

export default BarChartLegend;
