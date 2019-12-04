/* eslint-disable import/extensions */
import React from 'react';
import HomePrice from './CostInputHomePrice.jsx';
import DownPayment from './CostInputDownPayment.jsx';

const CostInputs = (props) => {
  const {
    cost, handleCostSubmit, downPay, handleDownPaySubmit,
  } = props;

  return (
    <div>
      <span>
        <HomePrice
          cost={cost}
          handleCostSubmit={handleCostSubmit}
        />
        <DownPayment
          cost={cost}
          downPay={downPay}
          handleDownPaySubmit={handleDownPaySubmit}
        />
      </span>
    </div>
  );
};

export default CostInputs;
