/* eslint-disable import/extensions */
import React from 'react';
// eslint-disable-next-line import/extensions
import InfoFlyout from './InfoFlyout.jsx';
import BarChart from './Summary/BarChart.jsx';
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
  const payment = mortgage + propertyTax + insurance + hoa;

  return (
    <>
      <Label fontSize="1.75rem">
        {`
          ${formatNum(payment)}
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
      <BarChart
        mortgage={mortgage}
        propertyTax={propertyTax}
        insurance={insurance}
        hoa={hoa}
        payment={payment}
      />
    </>
  );
};

export default Summary;
