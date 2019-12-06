/* eslint-disable import/extensions */
import React from 'react';
import { FullContainer, HalfContainer } from './styles.jsx';
import HomePrice from './CostInputs/HomePrice.jsx';
import DownPayment from './CostInputs/DownPayment.jsx';

const CostInputs = (props) => {
  const {
    cost,
    handleCostSubmit,
    downPay,
    handleDownPaySubmit,
    redfinCostEstimate,
  } = props;

  return (
    <FullContainer>
      <HalfContainer>
        <HomePrice
          cost={cost}
          handleCostSubmit={handleCostSubmit}
          redfinCostEstimate={redfinCostEstimate}
        />
      </HalfContainer>
      <HalfContainer>
        <DownPayment
          cost={cost}
          downPay={downPay}
          handleDownPaySubmit={handleDownPaySubmit}
        />
      </HalfContainer>
    </FullContainer>
  );
};

export default CostInputs;
