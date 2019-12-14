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
    <div>
      <Label fontSize="1.75rem">
        {`
          ${formatNum(getMortgagePayment(cost, unFormatLoan(loanType).term, rateUser, downPay))}
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
