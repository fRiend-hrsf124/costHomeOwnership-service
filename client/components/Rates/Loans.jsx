/* eslint-disable import/extensions */
import React from 'react';
import { FullContainer, Carousel, Loan } from '../styles.jsx';

const Loans = (props) => {
  const { cost, rates } = props;
  return (
    <FullContainer>
      <Carousel>
        {rates.map((rate) => (
          <Loan key={rate.rateId}>
            <span>{rate.apr}</span>
            <img alt="logo" src={rate.lenderLogoUrl} />
          </Loan>
        ))}
      </Carousel>
    </FullContainer>
  );
};

export default Loans;
