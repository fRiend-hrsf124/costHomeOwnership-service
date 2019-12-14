/* eslint-disable import/extensions */
import React from 'react';
import { LegendDot } from '../styles.jsx';

const Dot = (props) => {
  const {
    color,
  } = props;
  return (
    <LegendDot viewBox="0 0 120 120" color={color}>
      <circle cx="60" cy="60" r="50" />
    </LegendDot>
  );
};

export default Dot;
