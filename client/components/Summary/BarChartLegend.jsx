/* eslint-disable import/extensions */
import React from 'react';
import { HalfContainer, Label } from '../styles.jsx';
import { formatNum } from '../../utils';


const BarChartLegend = (props) => {
  const {
    // legendColor,
    legendKey,
    legendVal,
  } = props;
  return (
    <>
      <HalfContainer>
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
