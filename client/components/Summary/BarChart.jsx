/* eslint-disable import/extensions */
import React from 'react';
import BarChartLegend from './BarChartLegend.jsx';
import { FullContainer } from '../styles.jsx';

const BarChart = (props) => {
  const {
    mortgage,
    propertyTax,
    insurance,
    hoa,
    // payment,
  } = props;
  return (
    <FullContainer>
      <BarChartLegend
        legendColor="#59e0d0"
        legendKey="Principal and Interest"
        legendVal={mortgage}
      />
      <BarChartLegend
        legendColor="#77a2d0"
        legendKey="Property Taxes"
        legendVal={propertyTax}
      />
      <BarChartLegend
        legendColor="#e69c8a"
        legendKey="HOA Dues"
        legendVal={hoa}
      />
      <BarChartLegend
        legendColor="#fadd77"
        legendKey="Homeowners' Insurance"
        legendVal={insurance}
      />
    </FullContainer>
  );
};

export default BarChart;
