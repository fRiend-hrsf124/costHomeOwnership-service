/* eslint-disable import/extensions */
import React from 'react';
import HomePrice from './CostInputHomePrice.jsx';
import DownPayment from './CostInputDownPayment.jsx';

const CostInputs = (props) => {
  const {
    cost,
    handleCostSubmit,
    downPay,
    handleDownPaySubmit,
    redfinCostEstimate,
  } = props;

  return (
    <div>
      <HomePrice
        cost={cost}
        handleCostSubmit={handleCostSubmit}
        redfinCostEstimate={redfinCostEstimate}
      />
      <DownPayment
        cost={cost}
        downPay={downPay}
        handleDownPaySubmit={handleDownPaySubmit}
      />
    </div>
  );
};

export default CostInputs;
