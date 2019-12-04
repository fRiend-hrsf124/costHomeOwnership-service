/* eslint-disable import/extensions */
import React from 'react';
import Price from './CostInputPrice.jsx';

const CostInputs = (props) => {
  const { cost, handleCostSubmit } = props;
  // const downPayCost = localCost * (localDownPay / 100);
  return (
    <div>
      <Price
        cost={cost}
        handleCostSubmit={handleCostSubmit}
      />
      {/* <input id="downPayCost">{downPayCost}</input> */}
      {/* <input id="downPay">{downPay}</input> */}
    </div>
  );
};

export default CostInputs;
