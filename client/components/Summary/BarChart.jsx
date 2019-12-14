/* eslint-disable import/extensions */
import React from 'react';
import BarChartLegend from './BarChartLegend.jsx';
import { FullContainer, GraphBar, GraphSegment } from '../styles.jsx';

const BarChart = (props) => {
  const {
    mortgage,
    propertyTax,
    insurance,
    hoa,
    payment,
  } = props;

  const green = '#59e0d0';
  const blue = '#77a2d0';
  const red = '#e69c8a';
  const yellow = '#fadd77';

  return (
    <FullContainer>
      <GraphBar>
        <GraphSegment
          color={green}
          width={`${100 * (mortgage / payment)}%`}
        />
        <GraphSegment
          color={blue}
          width={`${100 * (propertyTax / payment)}%`}
        />
        <GraphSegment
          color={red}
          width={`${100 * (hoa / payment)}%`}
        />
        <GraphSegment
          color={yellow}
          width={`${100 * (insurance / payment)}%`}
        />
      </GraphBar>
      <BarChartLegend
        legendColor={green}
        legendKey="Principal and Interest"
        legendVal={mortgage}
      />
      <BarChartLegend
        legendColor={blue}
        legendKey="Property Taxes"
        legendVal={propertyTax}
      />
      <BarChartLegend
        legendColor={red}
        legendKey="HOA Dues"
        legendVal={hoa}
      />
      <BarChartLegend
        legendColor={yellow}
        legendKey="Homeowners' Insurance"
        legendVal={insurance}
      />
    </FullContainer>
  );
};

export default BarChart;
