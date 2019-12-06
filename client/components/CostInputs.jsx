/* eslint-disable import/extensions */
import React from 'react';
import { FullContainer, HalfContainer } from './styles.jsx';
import HomePrice from './CostInputs/HomePrice.jsx';
import DownPayment from './CostInputs/DownPayment.jsx';

const CostInputs = (props) => {
  const {
    handleUserSubmit,
    cost,
    downPay,
    redfinCostEstimate,
  } = props;

  return (
    <FullContainer>
      <HalfContainer>
        <HomePrice
          cost={cost}
          handleUserSubmit={handleUserSubmit}
          redfinCostEstimate={redfinCostEstimate}
        />
      </HalfContainer>
      <HalfContainer>
        <DownPayment
          cost={cost}
          downPay={downPay}
          handleUserSubmit={handleUserSubmit}
        />
      </HalfContainer>
    </FullContainer>
  );
};

export default CostInputs;
