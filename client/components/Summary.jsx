import React from 'react';
// eslint-disable-next-line import/extensions
import { FullContainer, HalfContainer, Label } from './styles.jsx';
import { unFormatLoan, formatNum, getMortgagePayment } from '../utils';

const Summary = (props) => {
  const {
    // eslint-disable-next-line no-unused-vars
    insuranceRate,
    // eslint-disable-next-line no-unused-vars
    propertyTaxRate,
    loanType,
    rateUser,
    cost,
    downPay,
  } = props;

  return (
    <FullContainer>
      <Label fontSize="1.75rem">
        {`
          ${formatNum(getMortgagePayment(cost, unFormatLoan(loanType).term, rateUser, downPay))}
          per month
        `}
      </Label>
    </FullContainer>
  );
};

export default Summary;
