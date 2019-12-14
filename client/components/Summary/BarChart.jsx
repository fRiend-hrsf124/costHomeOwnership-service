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
        legendColor="green"
        legendKey="Principal and Interest"
        legendVal={mortgage}
      />
      <BarChartLegend
        legendColor="blue"
        legendKey="Property Taxes"
        legendVal={propertyTax}
      />
      <BarChartLegend
        legendColor="red"
        legendKey="HOA Dues"
        legendVal={hoa}
      />
      <BarChartLegend
        legendColor="yellow"
        legendKey="Homeowners' Insurance"
        legendVal={insurance}
      />
    </FullContainer>
  );
};

export default BarChart;
