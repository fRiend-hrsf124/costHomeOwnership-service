/* eslint-disable import/extensions */
import React from 'react';
// eslint-disable-next-line import/extensions
import InfoFlyout from './InfoFlyout.jsx';
import {
  FullContainer, HalfContainer, Label, LinkAway,
} from './styles.jsx';
import { unFormatLoan, formatNum, getMortgagePayment } from '../utils';

const Summary = (props) => {
  const {
    insuranceRate,
    propertyTaxRate,
    loanType,
    rateUser,
    cost,
    hoa,
    downPay,
  } = props;

  const mortgage = getMortgagePayment(cost, unFormatLoan(loanType).term, rateUser, downPay);
  const propertyTax = Math.trunc((cost * (propertyTaxRate / 100)) / 12);
  const insurance = Math.trunc((cost * (insuranceRate / 100)) / 12);
  // debugger;
  return (
    <div>
      <Label fontSize="1.75rem">
        {`
          ${formatNum(mortgage + propertyTax + insurance + hoa)}
          per month
        `}
      </Label>
      <FullContainer>
        <HalfContainer>
          <Label>
            {`
              ${loanType},
               ${rateUser}% Interest
            `}
          </Label>
          <InfoFlyout />
        </HalfContainer>
        <HalfContainer align="right">
          <LinkAway>
            Customize calculations
          </LinkAway>
        </HalfContainer>
      </FullContainer>
    </div>
  );
};

export default Summary;
