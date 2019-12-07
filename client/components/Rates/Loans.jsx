/* eslint-disable import/extensions */
import React from 'react';
import { FullContainer } from '../styles.jsx';

const Loans = (props) => {
  const { cost, rates } = props;
  return (
    <FullContainer>
      {cost}
      <br />
      {rates.map((rate) => (
        <div key={rate.rateId}>
          <span>{rate.apr}</span>
          <img alt="logo" src={rate.lenderLogoUrl} />
        </div>
      ))}
    </FullContainer>
  );
};

export default Loans;
